const fs = require('fs-extra')

module.exports = welcome = async (client, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `Paz do Senhor meu sancto👋, bem vindo ao BR Church Friends *${name}*.\nO objetivo do grupo é fazermos amizades, falar do amor de Deus e tudo mais!\n\nPor favor, queira fazer o favor de se apresentar com\n• Foto (opcional) 📷\n• Nome ☂️\n• Idade 👶\n• Igreja ⛪\n\nDemais regras na descrição do grupo.\nCaso queria saber quem são os adms do grupo, basta mandar .listadmins`
            if (pepe == '' || pepe == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://scontent.fbel10-1.fna.fbcdn.net/v/t39.30808-6/241826745_542040287084024_3906587146433721054_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8631f5&_nc_ohc=8VdSZFdNtsIAX_a7vbH&_nc_ht=scontent.fbel10-1.fna&oh=1e6d351eabb85aae3607ec2a5423c317&oe=619EF916', 'profile.jpg', capt)
            } else {
                await client.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
