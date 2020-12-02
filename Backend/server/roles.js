<<<<<<< HEAD
=======
// server/roles.js
>>>>>>> a44516aec9bb86dd6bfdf38df00fa78d71ce096e
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("doctor")
 .extend("user")
 .readAny("profile")

ac.grant("admin")
 .extend("user")
 .extend("doctor")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();