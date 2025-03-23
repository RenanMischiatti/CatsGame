$(document).ready(function () {
    var game = new Game();  

    $('.rating input').on('input', function() {
        $('#btnStartGame').attr('disabled', false);  // Habilita o botão
    });

    $('#btnStartGame').on('click', function() {
        let difficulty = $('input[name="rating"]:checked').val();  

        game.setDifficulty(difficulty);
        game.start();  
    });

    $(document).on('click', ".cat-image", function() {
        let tipo = $(this).data('tipo');
        
        $(this).remove();
        if (tipo === 'dog') {
            game.removeLife()
            return;  
        }
    
        let width = $(this).width();  
        game.addScore(width); 
    });
});