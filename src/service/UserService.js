import HttpService from './HttpService.js'

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
function getUsers() {
    return HttpService.get('user')
}
function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

async function unreadBooking(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    return _handleLogin(updatedUser);
}

async function resetUnreadBookings(user) {
    const updatedUser = await HttpService.put(`user/reset/${user._id}`, user)
    return _handleLogin(updatedUser);
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}