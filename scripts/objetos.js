const createUser = ({ username = "Anonymus", age = 27} = {}) => {
    let active = false

    return {
        username,
        age,

        setStatus(status){
            active = status
            return this
        },

        getStatus() {
            return active
        }
    }
}

const user1 = createUser({username: "Ismael"})

const user2 = createUser({age: 19})

console.log(user2)