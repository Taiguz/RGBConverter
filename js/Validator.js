export default class Validator {

    constructor() {
        this.hexReg = /^\s*$|[^a-fA-F0-9]+/
    }

    //Valida os campos 

    validateHex(event) {
        if (this.hexReg.test(event.target.value)) {
            console.log('Insira somente HEX')
            event.stopImmediatePropagation()
            return false
        }
    }

    //validadeBytes()

    //validateWord()

    //validateDWord()

    //validateBinary()

}