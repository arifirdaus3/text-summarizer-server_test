const sastrawi = require('sastrawijs')
const stemmer = new sastrawi.Stemmer()
const tokenizer = new sastrawi.Tokenizer()
const stopword = require('./stopword')
module.exports = class Summarizer{
    constructor(text = "Please Add Some Text"){
        if(text){
            this.result={};
            this.result.original = text
            this.result.originalSentence = this.splitter(this.result.original)
            this.result.lexical = []
            this.result.stopword = []
            this.result.sentence=[]
            this.result.stem =[]
            this.result.token = []
            this.result.originalSentence.forEach((el,i) => {
                this.result.lexical.push({sentence: this.lexical(el.sentence).trim(),index: i})
                this.result.stopword.push({sentence: this.stopword(this.result.lexical[i].sentence),index: i})
                this.result.token.push({sentence: tokenizer.tokenize(this.result.stopword[i].sentence), index: i})
                this.result.token[i].sentence.forEach(el => {
                    this.result.stem.push({ori:el,res:stemmer.stem(el)})
                })
            })
            
            this.result.mix = this.join(this.result.stopword, this.result.originalSentence)
            
        }
    }
    lexical(text){
        return text.replace(/\d+|[,!*()#$%^&*<>:;'"?\/“”\[\]]/g,"").toLowerCase()
    }
    stopword(text){
        var temp = text.split(/\s+|\n+/g)
        return temp.filter(val => !stopword.includes(val)).join(" ")
    }
    splitter(text){
        let res = text.split(/\.|\r*\n+/gi)
        res = res.filter(w => w!="")
        let data = []
        res.forEach((el,ind) =>{
            data.push({sentence: el, index: ind })
        })
        return data
    }
    join(a,b){
        let res = []
        b.forEach((val,i)=>{
            res.push({sentence: a[i].sentence.trim(), index: i, originalSentence: val.sentence })
        })
        return res
    }
    steming(text){
        let data = []
        text.forEach(el => {
            data.push({ori: el, res: stemmer.stem(el)})
        })
        return data
    }
}