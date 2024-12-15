const UserHelper = (()=>{
    const checkAndLoadUserLogged = async () => {
        let user = null;
        const u = sessionStorage.getItem("user");
        if (u) {
            let user_ = JSON.parse(u);
            user = user_;
        }
        return user;
    };

    return{ checkAndLoadUserLogged }

})()

export default UserHelper;