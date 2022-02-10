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


/*const isAgent =  (req, res, next) => {
  if (req.user.isAgent === true && !req.session.currentUser) {
  return res.redirect('/login');
  } next();
}
 */


module.exports = {
    isLoggedIn,
    isLoggedOut,
    
   
};