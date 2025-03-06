document.addEventListener("DOMContentLoaded", function () {
    const floors = {
        "floor-4": 1,
        "floor-3": 9,
        "floor-xfood": 2,
        "floor-g1": 4
    };

    // Carregar os vídeos salvos do localStorage
    Object.keys(floors).forEach(floor => {
        const container = document.querySelector(`#${floor} .tv-control-container`);
        const savedUrls = JSON.parse(localStorage.getItem(floor)) || [];

        savedUrls.forEach((url, index) => {
            const tvControl = document.createElement("div");
            tvControl.classList.add("tv-control");
            tvControl.innerHTML = `
                <h3>TV ${index + 1}</h3>
                <div class="video-container">
                    <video class="video-player" autoplay loop muted></video>
                    <img class="image-display" style="display: none; max-width: 100%; border-radius: 4px;" />
                </div>
                <input type="text" class="video-url" placeholder="Cole a URL do vídeo ou imagem" value="${url}">
                <button class="add-video">Adicionar</button>
                <button class="pause">Pausar</button>
            `;
            container.appendChild(tvControl);
            updateMedia(tvControl, url); // Atualiza a mídia (vídeo ou imagem)
        });
    });

    // Função para atualizar o vídeo ou imagem
    function updateMedia(tvControl, url) {
        const video = tvControl.querySelector(".video-player");
        const image = tvControl.querySelector(".image-display");

        if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg")) {
            image.src = url;
            image.style.display = "block";
            video.style.display = "none";
        } else {
            video.src = url;
            video.style.display = "block";
            image.style.display = "none";
        }
    }

    // Função para salvar a URL no localStorage
    function saveVideoUrl(floor, url) {
        const savedUrls = JSON.parse(localStorage.getItem(floor)) || [];
        savedUrls.push(url);
        localStorage.setItem(floor, JSON.stringify(savedUrls));
    }

    // Adicionar evento de adicionar vídeo
    document.querySelectorAll(".add-video").forEach(button => {
        button.addEventListener("click", function () {
            const tvControl = this.closest(".tv-control");
            const video = tvControl.querySelector(".video-player");
            const image = tvControl.querySelector(".image-display");
            const urlInput = tvControl.querySelector(".video-url").value;

            if (urlInput) {
                updateMedia(tvControl, urlInput);
                saveVideoUrl(tvControl.closest('.tv-control-container').id, urlInput); // Salva a URL no localStorage
            }
        });
    });

    // Evento de pausar/reproduzir vídeo
    document.querySelectorAll(".pause").forEach(button => {
        button.addEventListener("click", function () {
            const tvControl = this.closest(".tv-control");
            const video = tvControl.querySelector(".video-player");
            if (!video.paused) {
                video.pause();
                this.textContent = "Reproduzir";
            } else {
                video.play();
                this.textContent = "Pausar";
            }
        });
    });

    // Controlar exibição dos andares
    document.querySelectorAll(".floor-button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".floor-content").forEach(content => {
                content.style.display = "none";
            });
            document.getElementById(this.dataset.floor).style.display = "block";
        });
    });

    // Controlar todos os vídeos
    document.getElementById("toggleAllTvs").addEventListener("click", function () {
        document.querySelectorAll(".video-player").forEach(video => {
            video.paused ? video.play() : video.pause();
        });
    });
});
