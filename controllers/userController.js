let users = [
    { name: "Sathishkumar", id: 1 },
    { name: "Yuvaraj", id: 2 },
    { name: "Sakthipriya", id: 3 },
]

exports.ListUsers = async(req, res)=>{
    res.send(users, 200)
};

exports.CreateUser = async(req, res) =>{
    const {name,id} = req.body;
    users.push({name,id})
    res.send({name,id}, 201)
}

exports.GetUser = async(req, res) =>{
    const { id } = req.params;
    const user = users.find(user=>user.id ==id)
    res.send(user)
}

exports.UpdateUser = async(req, res) =>{
    const { name,id } = req.body;
    users = users.map(item=>item.id ==id?{ name,id }:item)
    res.send({name,id},202)
}

exports.DeleteUser = async(req, res)=>{
    const { id } = req.params;
    users = users.filter(item=>item.id !=id)
    res.send({"detail":"User deleted sucessfully!"},204)
}

