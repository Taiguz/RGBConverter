import RGBCard from './RGBCard.js'
import Validator from './Validator.js';
class Emitter extends Validator {

    constructor() {
        super()
        this.cardConfigs = [
            {
                name: '888',
                displayName: 'RGB888 / RGB24',
                rgb: [{
                    mask: 0xFF0000, // red
                    displacement: 16,
                    bits: 8
                }, {
                    mask: 0xFF00, // green
                    displacement: 8,
                    bits: 8

                }, {
                    mask: 0xFF, // blue
                    displacement: 0,
                    bits: 8

                }]

            },
            {
                name: '565',
                displayName: 'RGB565 / RGB16',
                rgb: [{
                    mask: 0xF800, // red
                    displacement: 11,
                    bits: 5
                }, {
                    mask: 0x7E0, // green
                    displacement: 5,
                    bits: 6
                }, {
                    mask: 0x1F, // blue
                    displacement: 0,
                    bits: 5
                }]
            },
        ]
        this.RGBCards = []
        this.selectRGB = document.querySelector('.search-bar select')
        this.hexValue = document.querySelector('.search-bar input')
        this.cardContainer = document.querySelector('.cards')
        this.selectRGB.innerHTML = this.cardConfigs
            .map(config => `<option value="${config.name}">${config.displayName}</option>`)
            .join('')
        this.createCards()
        this.appendEvents()
        //Pega as referencias na DOM e guarda
        //Tem o vetor de cards
    }
    convertHex(hex, callingInstance) {
        if (hex) {
            this.selectRGB.selectedIndex = 0
            this.hexValue.value = hex
        }

        this.RGBCards.forEach(card => card != callingInstance ? card.convertHex(this.hexValue.value) : null)
    }
    appendEvents() {
        this.hexValue.addEventListener('keyup', this.validateHex.bind(this))
        this.hexValue.addEventListener('keyup', () => this.convertHex())
    }
    createCards() {
        this.cardConfigs.forEach(card => {
            this.RGBCards.push(new RGBCard({
                card,
                emitter: this
            }))
        })
    }
    //Recebe o trigger de algum card que foi mudadoe atualiza todos os outros
    //updateCards()


}

new Emitter()