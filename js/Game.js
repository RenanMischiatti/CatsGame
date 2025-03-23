class Game {
    constructor() {
        this.score = 0;
        this.life = 3;
        this.difficulty = "normal";  
        this.intervalId = null;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;

        let lifesRules = {
            "easy": 3,
            "normal": 2,
            "hard": 1
        };
    
        this.life = lifesRules[difficulty];
        this.updateLifesDisplay()
    }

    start() {
        $("#modalStart").modal('hide');
        
        this.continueShowing();
        this.intervalId = setInterval(() => {
            this.continueShowing();
        }, 8000);
    }

    continueShowing() {
        // Obtém URLs de gatos e cachorro e mistura elas
        let catUrls = this.getCatsPhotos();
        let dogUrl = this.getDogPhoto();
        
        // Insere a URL do cachorro aleatoriamente no array de URLs dos gatos
        catUrls.splice(Math.floor(Math.random() * catUrls.length), 0, dogUrl);

        // Exibe as imagens
        this.displayPhotos(catUrls);
    }

    // Função para pegar imagens de gatos
    getCatsPhotos() {
        let urls = [];
        
        $.ajax({
            url: "https://api.thecatapi.com/v1/images/search?limit=100",
            method: "GET",
            async: false, 
            success: function(response) {
                urls = response.map(cat => cat.url); 
            },
            error: function(error) {
                console.error("Error fetching cat images:", error);
            }
        });

        return urls;
    }

    // Função para pegar uma imagem de cachorro
    getDogPhoto() {
        let dogUrl = '';

        $.ajax({
            url: "https://dog.ceo/api/breeds/image/random",
            method: "GET",
            async: false,
            success: function(response) {
                dogUrl = response.message;  // URL da imagem de cachorro
            },
            error: function(error) {
                console.error("Error fetching dog image:", error);
            }
        });

        return dogUrl;
    }

    // Função para exibir as fotos
    displayPhotos(urls) {
        let container = $("body");

        urls.forEach((url, index) => {
            // Gerar um tempo de delay aleatório entre 1 e 3 segundos (1000 a 3000 milissegundos)
            let randomDelay = Math.floor(Math.random() * 2000) + 1000;
    
            setTimeout(() => {
                let x = Math.random() * 80;
                let y = Math.random() * 80;
    
                // Gerar tamanho aleatório entre 50px e 200px para width e height
                let size = Math.floor(Math.random() * 151) + 50;  // Número aleatório entre 50 e 200

                // Verificar se a URL é de um cachorro ou de um gato
                let tipo = url.includes("dog.ceo") ? "dog" : "cat";
    
                let imgElement = $(`<img src="${url}" alt="Random Cat or Dog" class="cat-image" data-tipo="${tipo}">`);
    
                imgElement.css({
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`
                });
    
                container.append(imgElement);

                setTimeout(() => {
                    imgElement.remove();
                }, 10000);
            }, randomDelay * index); 
        });
    }

    addScore(score) {
        this.score = this.score + score;
        $("#score").html(this.score)
    }

    removeLife() {
        this.life = this.life - 1;

        this.updateLifesDisplay();
        if (this.life == 0) {
            return this.endGame()
        }
    }

    updateLifesDisplay() {
        let lifeContainer = $("#lifes");
        lifeContainer.empty(); 
    
        for (let i = 0; i < this.life; i++) {
            lifeContainer.append('<img width="30" src="img/heart.png" alt="Vida">');
        }
    }

    endGame() {
        clearInterval(this.intervalId); // Para a criação contínua de imagens
        $("body").empty(); // Remove todas as imagens e elementos do jogo

        alert("Game Over! Seu Score: " + this.score);
        location.reload(); // Recarrega a página para reiniciar o jogo
    }
}
