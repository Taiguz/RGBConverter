import Validator from './Validator.js'
export default class RGBCard extends Validator {

    constructor(parameters) {
        super()
        this.cardConfig = parameters.card
        this.rgbFormat = parameters.card.rgb
        this.emitter = parameters.emitter

        this.sliders = []
        this.infos = []
        this.createCard()
        this.appendEvents()
    }
    appendEvents() {
        this.sliders.forEach(slider => {
            const { sliderEl, valueEl } = slider
            const notSameValue = () => valueEl.value != sliderEl.value
            const mountRGB = () => {
                let rgb = this.sliders.map((slider, index) => ({
                    value: slider.sliderEl.value,
                    bits: this.rgbFormat[index].bits
                }))
                return this.displayColor(rgb)
            }
            sliderEl
                .addEventListener('change', (() => {
                    if (notSameValue()) {
                        valueEl.value = sliderEl.value
                        this.emitter.convertHex(mountRGB(), this)
                    }
                }).bind(this))

            valueEl
                .addEventListener('change', (() => {
                    if (notSameValue()) {
                        sliderEl.value = valueEl.value
                        this.emitter.convertHex(mountRGB(), this)
                    }
                }).bind(this))
        })
    }
    displayColor(rgb) {
        let transformedRgb = []
        let displayHex = ''
        let bits = []
        let bitsLength = 0
        rgb.forEach(color => {
            let colorValue
            const bitsFrom = color.bits
            const bitsTo = 8
            bitsLength += color.bits
            displayHex += `${parseInt(color.value).toString(16).padStart(2, '0')}`.toUpperCase()
            bits.push(parseInt(color.value).toString(2).padStart(color.bits, '0'))
            colorValue = this.transformBits(color.value, bitsFrom, bitsTo)
            transformedRgb.push(colorValue)
        })
        this.hexInput.value = displayHex
        if (this.emitter.endianess)
            bits.reverse()
        let intValue = parseInt(bits.join(''), 2)
        let int8 = []
        while (bitsLength > 0) {
            int8.push(intValue & 0xFF)
            intValue = intValue >> 8
            bitsLength -= 8
        }
        this.bytesInput.value = int8.join(' ')
        this.binaryInput.value = bits.reverse().join('')
        const [red, green, blue] = transformedRgb
        this.colorBox.style.backgroundColor = `rgb(${red},${green},${blue})`
        return `${parseInt(red).toString(16)}${parseInt(green)
            .toString(16).padStart(2, '0')}${parseInt(blue).toString(16).padStart(2, '0')}`.toUpperCase()
    }
    transformBits(value, bitsFrom, bitsTo) {
        const difference = Math.abs(bitsFrom - bitsTo)
        if (bitsFrom > bitsTo) {
            value = value >> difference
        }
        else if (bitsFrom < bitsTo) {
            let colorMostSignificantBits = value >> bitsFrom - difference
            value = value << difference
            value = value | colorMostSignificantBits
        }
        return value
    }
    convertRGB(rgb) {
        let rgb8bits
        rgb.forEach(color => {
            rgb8bits.push({
                value: this.transformBits(color.value, color.bits, 8),
                bits: 8
            })
        })
        this.displayColor(rgb8bits)

    }
    convertHex(hex) {

        const intValue = parseInt(hex, 16)
        const { rgb } = this.emitter.cardConfigs[this.emitter.selectRGB.selectedIndex]
        this.sliders.forEach((slider, index) => {
            let color = (intValue & rgb[index].mask) >> rgb[index].displacement
            const bitsFrom = rgb[index].bits
            const bitsTo = this.rgbFormat[index].bits
            color = this.transformBits(color, bitsFrom, bitsTo) // Mudança de 8bits para 5 por exemplo
            //color -> color em 8bits
            // Converter para os bits desejados 
            this.rgbFormat[index].value = color
            slider.valueEl.value = color
            slider.sliderEl.value = color
        })
        this.displayColor(this.rgbFormat)
    }

    createCard() {
        this.card = document.createElement('section')
        this.card.classList.add('card')
        this.card.innerHTML = `
        <header>
        <img src="./img/star.svg">
        <h2>${this.cardConfig.displayName}</h2>
        </header>
        <div class="rgb-slider">
            <div class="sliders">
                <p>R<input type="range" class="slider"><input class="number-input" type="number" value="0"></input></p>
                <p>G<input type="range" class="slider"><input class="number-input" type="number" value="0"></input></p>
                <p>B<input type="range" class="slider"><input class="number-input" type="number" value="0"></input></p>
            </div>
        <div class="rgb-color"></div>
        </div>
        <div class="info">
            <p>Hex <input class="material-shadow" placeholder="#FFF"></p>
            <p>Bytes <input class="material-shadow" placeholder="89 89"></p>
            <p>Binary <input class="material-shadow" placeholder="111100111111"></p>
        </div>`
        let inputs = this.card.querySelectorAll('div.info p')
        let [hexInput, bytesInput, binaryInput] = inputs
        this.hexInput = hexInput.querySelector('input')
        this.bytesInput = bytesInput.querySelector('input')
        this.binaryInput = binaryInput.querySelector('input')
        let sliders = this.card.querySelectorAll('div.sliders p')
        sliders.forEach(slider => this.sliders.push({
            sliderEl: slider.querySelector('input.slider'),
            valueEl: slider.querySelector('input.number-input')
        }))
        this.sliders.forEach((slider, index) => {
            const { sliderEl, valueEl } = slider
            const max = Math.pow(2, this.rgbFormat[index].bits) - 1
            sliderEl.setAttribute('max', max)
            sliderEl.setAttribute('min', 0)
            valueEl.setAttribute('max', max)
            valueEl.setAttribute('min', 0)

        })
        this.colorBox = this.card.querySelector('div.rgb-color')
        this.emitter.cardContainer.appendChild(this.card)
    }
    //preciso converter para um formato principal primeiro, independete 
    //de onde for a fonte para depois trabalhar melhor

    //Converte os valores RGB atualiza as colores e outros valores 


    //Pega o valor do campo hex na dom e transforma para o formato de pixel especificado



    //convertBytes()

    //convertWord()

    //convertDWord()

    //convertBinary()

    //Atualiza a color e os valores em porcentagem ou absolutos na DOM



}