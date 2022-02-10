const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login');
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
}


/**function isAgent (req, res, next) {
  if (req.users.role === 'agent') next();
  else res.redirect('/login');
}

function isAgentOrClient (req, res, next) {
  if (req.user.role === 'admin' || req.user.role === 'client') next();
  else res.redirect('/login');
}
**/

module.exports = {
    isLoggedIn,
    isLoggedOut,
    
};