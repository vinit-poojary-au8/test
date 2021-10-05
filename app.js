// const axios = require('axios').default

const button = document.querySelector('.shareButton')

button.addEventListener('click', (e) => {
	e.preventDefault()
	share()
})

const share = () => {
	axios.get('https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK', {
		responseType: 'blob',
	})
		.then((response) => {
			const pdf = new File([response?.data], `id.pdf`, {
				type: 'application/pdf',
			})
			const files = [pdf]

			// Share PDF file if supported.
			if (navigator.canShare && navigator.canShare({ files })) {
				navigator.share({
					files: files,
				})
					.then(() => {
						console.log('Share was successful.')
						// message.success('Share was successful.')
					})
					.catch((error) => {
						console.log('Sharing failed', error)
						// message.error('Sharing failed', error)
					})
			} else {
				console.log(`Your system doesn't support sharing files.`)
				// message.info(`Your system doesn't support sharing files.`)
			}
		})
		.catch((error) => {
			console.log(error)
			// message.error(error)
		})
}
