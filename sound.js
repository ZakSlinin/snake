const audioContext = new window.AudioContext();

class SoundPlayer {
    constructor(url) {
        this.url = url
        this.audioBuffer = null

        this.request().then(res => {
            console.log('sound loaded')
        })
    }

    async request() {
        try {
            const res = await fetch(this.url)
            const arrayBuffer = await res.arrayBuffer()

            this.audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        } catch (error) {
            console.log(error)
        }
    }

    play(start, duration) {
        if (this.audioBuffer) {
            const source = audioContext.createBufferSource()
            source.buffer = this.audioBuffer

            source.connect(audioContext.destination)

            source.start(0, start, duration)
        }
    }
}