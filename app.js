new Vue({
    el: '#app',
    data: {
        running: false,
        lifePlayer: 100,
        lifeMonster: 100,
        logs: []
    },
    computed: {
       hasResult() {
           return this.lifePlayer == 0 || this.lifeMonster == 0
       }
    },
    methods: {
        startGame() {
            this.running = true,
            this.lifePlayer = 100,
            this.lifeMonster = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('lifeMonster', 5, 12, especial, 'Jogador', 'Monstro', 'player') // O monstro pode receber ataque especial
            if(this.lifeMonster > 0) {
                this.hurt('lifePlayer', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            } 
        },

        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt} .`, cls)
        },

        healAndHurt(){
            this.heal(10, 15)
            this.hurt('lifePlayer', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },

        heal(min, max){
            const heal = this.getRandom(min, max)
            this.lifePlayer = Math.min(this.lifePlayer + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },

        //Responsável por calcular o valor randômico
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },

        //Registrando os ataques (player, monster)
        registerLog(text, cls) {
            this.logs.unshift({text, cls})
        },
    },
    watch: {
        hasResult(value) {
            if(value) this.running = false
        }
    }
})