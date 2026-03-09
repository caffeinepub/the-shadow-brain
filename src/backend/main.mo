import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Project = {
    id : Text;
    name : Text;
    description : Text;
    createdAt : Time.Time;
    createdBy : Principal;
    tags : [Text];
  };

  module Project {
    public func compareByCreatedAt(p1 : Project, p2 : Project) : Order.Order {
      Int.compare(p2.createdAt, p1.createdAt);
    };
  };

  type Decision = {
    id : Text;
    projectId : Text;
    title : Text;
    reasoning : Text;
    outcome : Text;
    tags : [Text];
    createdAt : Time.Time;
    createdBy : Principal;
    importance : Nat;
  };

  module Decision {
    public func compareByImportanceAndRecency(a : Decision, b : Decision) : Order.Order {
      switch (Nat.compare(b.importance, a.importance)) {
        case (#equal) { Int.compare(b.createdAt, a.createdAt) };
        case (order) { order };
      };
    };

    public func compareByCreatedAtDescending(a : Decision, b : Decision) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  type ContextFragment = {
    id : Text;
    decisionId : Text;
    projectId : Text;
    content : Text;
    createdAt : Time.Time;
    createdBy : Principal;
  };

  var projects : Map.Map<Text, Project> = Map.empty<Text, Project>();
  var decisions : Map.Map<Text, Decision> = Map.empty<Text, Decision>();
  var contextFragments : Map.Map<Text, ContextFragment> = Map.empty<Text, ContextFragment>();
  var userProfiles : Map.Map<Principal, UserProfile> = Map.empty<Principal, UserProfile>();

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Management
  public shared ({ caller }) func createProject(id : Text, name : Text, description : Text, tags : [Text]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };
    if (projects.containsKey(id)) {
      Runtime.trap("Project already exists");
    };
    let newProject : Project = {
      id;
      name;
      description;
      createdAt = Time.now();
      createdBy = caller;
      tags;
    };
    projects.add(id, newProject);
  };

  public shared ({ caller }) func updateProject(id : Text, name : Text, description : Text, tags : [Text]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    switch (projects.get(id)) {
      case (null) { Runtime.trap("Project not found") };
      case (?existing) {
        let updatedProject : Project = {
          existing with
          name;
          description;
          tags;
        };
        projects.add(id, updatedProject);
      };
    };
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };
    projects.remove(id);
  };

  public query ({ caller }) func getProject(id : Text) : async ?Project {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can read projects");
    };
    projects.get(id);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can read projects");
    };
    projects.values().toArray();
  };

  // Decision Management
  public shared ({ caller }) func createDecision(id : Text, projectId : Text, title : Text, reasoning : Text, outcome : Text, tags : [Text], importance : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can create decisions");
    };
    switch (projects.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?_) {
        let newDecision : Decision = {
          id;
          projectId;
          title;
          reasoning;
          outcome;
          tags;
          createdAt = Time.now();
          createdBy = caller;
          importance;
        };
        decisions.add(id, newDecision);
      };
    };
  };

  public shared ({ caller }) func deleteDecision(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete decisions");
    };
    if (not decisions.containsKey(id)) {
      Runtime.trap("Decision not found");
    };
    decisions.remove(id);
  };

  public query ({ caller }) func getProjectDecisions(projectId : Text) : async [Decision] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can read decisions");
    };
    decisions.values().toArray().filter(func(d) { d.projectId == projectId }).sort(Decision.compareByCreatedAtDescending);
  };

  // Context Fragment Management
  public shared ({ caller }) func createContextFragment(id : Text, decisionId : Text, projectId : Text, content : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can create context fragments");
    };
    switch (decisions.get(decisionId)) {
      case (null) { Runtime.trap("Decision does not exist") };
      case (?_) {
        let fragment : ContextFragment = {
          id;
          decisionId;
          projectId;
          content;
          createdAt = Time.now();
          createdBy = caller;
        };
        contextFragments.add(id, fragment);
      };
    };
  };

  public query ({ caller }) func getContextFragment(id : Text) : async ?ContextFragment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can read context fragments");
    };
    contextFragments.get(id);
  };

  public query ({ caller }) func getDecisionContextFragments(decisionId : Text) : async [ContextFragment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can read context fragments");
    };
    contextFragments.values().toArray().filter(func(cf) { cf.decisionId == decisionId });
  };

  public shared ({ caller }) func updateContextFragment(id : Text, content : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can update context fragments");
    };
    switch (contextFragments.get(id)) {
      case (null) { Runtime.trap("Context fragment not found") };
      case (?existing) {
        let updated : ContextFragment = {
          existing with
          content;
        };
        contextFragments.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteContextFragment(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can delete context fragments");
    };
    if (not contextFragments.containsKey(id)) {
      Runtime.trap("Context fragment not found");
    };
    contextFragments.remove(id);
  };

  // Query and Search Functions
  public query ({ caller }) func searchDecisions(keyword : Text) : async [Decision] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can search decisions");
    };
    let lowerKeyword = keyword.toLower();
    let results = List.empty<Decision>();

    for (decision in decisions.values()) {
      let titleMatches = decision.title.toLower().contains(#text lowerKeyword);
      let reasoningMatches = decision.reasoning.toLower().contains(#text lowerKeyword);
      let tagMatches = decision.tags.findIndex(func(tag) { tag.toLower().contains(#text lowerKeyword) }) != null;
      if (titleMatches or reasoningMatches or tagMatches) {
        results.add(decision);
      };
    };
    results.toArray();
  };

  public query ({ caller }) func getHighImpactDecisions(projectId : Text) : async [Decision] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can access decisions");
    };
    let projectDecisions = decisions.values().toArray().filter(func(d) { d.projectId == projectId });
    let sortedDecisions = projectDecisions.sort(Decision.compareByImportanceAndRecency);
    sortedDecisions.sliceToArray(0, if (sortedDecisions.size() < 3) { sortedDecisions.size() } else { 3 });
  };

  public query ({ caller }) func getProjectTags(projectId : Text) : async [Text] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can access project tags");
    };
    let projectDecisions = decisions.values().toArray().filter(func(d) { d.projectId == projectId });
    let tagResults = List.empty<Text>();

    for (decision in projectDecisions.values()) {
      let newTags = decision.tags.filter(
        func(tag) {
          var contains = false;
          tagResults.values().forEach(
            func(existingTag) {
              if (existingTag == tag) { contains := true };
            }
          );
          not contains;
        }
      );
      for (tag in newTags.values()) {
        tagResults.add(tag);
      };
    };
    switch (projects.get(projectId)) {
      case (null) { tagResults.toArray() };
      case (?project) {
        let projectTags = project.tags.filter(
          func(tag) {
            var contains = false;
            tagResults.values().forEach(
              func(existingTag) {
                if (existingTag == tag) { contains := true };
              }
            );
            not contains;
          }
        );
        for (tag in projectTags.values()) {
          tagResults.add(tag);
        };
        tagResults.toArray();
      };
    };
  };
};
