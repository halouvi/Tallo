import {httpService} from './httpService.js'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    unreadBooking,
    resetUnreadBookings
}
function getUsers(usersIds) {
    return httpService.get(`user/${usersIds}`)
}
function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

async function unreadBooking(user) {
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    return _handleLogin(updatedUser);
}

async function resetUnreadBookings(user) {
    const updatedUser = await httpService.put(`user/reset/${user._id}`, user)
    return _handleLogin(updatedUser);
}


function _handleLogin(user) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user))
    return user;
}