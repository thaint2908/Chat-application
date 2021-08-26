const senderInfo = (members, userId) => {
    const usernames=[];
    const id = [];
    let avatar = "";
    let status;
    for (const member of members) {
        if (member._id !== userId) {
            usernames.push(member.name);
            status = member.is_active;
            id.push(member._id);
            avatar = member.avatar;
        }
    }
    return {
        usernames: usernames.join(", "),
        id: id,
        avatar:avatar,
        status,
    };
}
export default senderInfo;