    //Class: GamePiece *-------------------------------------------------------
        function GamePiece(){
            //Instance Members
            this.shape = "";
            //End Instance Members

            //Instance Methods
            this.setRandomShape = function(){
                this.shape = Math.floor(Math.random() * GamePiece.shapes.length);
            }

            this.setNextShape = function(){
                this.shape++;
                if(this.shape > GamePiece.shapes.length - 1) this.shape = 0;
            }
            //End Instance Methods

            //Constructor
            this.setRandomShape();
            //End Constructor
        }

        //Public Static Members
        GamePiece.shapes = [
                    {   'name':'circle',
                        'url':'circle.png'
                    },
                    { 'name':'triangle',
                        'url':'triangle.png'
                      },
                    {   'name':'square',
                        'url':'square.png'
                    },
                    {  'name':'diamond',
                        'url':'diamond.png'
                    }
        ];
        //End Public Static Members
    //End Class: GamePiece *---------------------------------------------------

    //Class: GameBoard *-------------------------------------------------------
        function GameBoard(){
            //Instance Members
            this.currentState = GameBoard.states.idle;
            this.target = $("#gameboard");
            this.gamePieces = new Array();
            this.initialGamePiece = "";
            this.targetGamePiece = "";
            this.rangeStart = "";
            this.rangeEnd = "";
            this.matchMade = false;
            this.initialMatch = true;
            //End Instance Members

            //Instance Methods
            this.setState = function(state){
                this.currentState = state;
            }
            this.getState = function(){
                return this.currentState;
            }

            this.setInitialGamePiece = function(piece){
                this.initialGamePiece = piece;
            }
            this.getInitialGamePiece = function(piece){
                return this.initialGamePiece;
            }

            this.setTargetGamePiece = function(piece){
                this.targetGamePiece = piece;
            }
            this.getTargetGamePiece = function(piece){
                return this.targetGamePiece;
            }

            this.swap = function(){
                //setting the state here prevents additional clicking while we try the swap
                this.setState(GameBoard.states.matching);
                var numInitial = Number(this.initialGamePiece);
                var numTarget = Number(this.targetGamePiece);

                if (numTarget == numInitial - GameBoard.cols ||
                    numTarget == numInitial + 1 ||
                    numTarget == numInitial + GameBoard.cols ||
                    numTarget == numInitial - 1){
                    //okay to swap
                    var temp = "";
                    temp = this.gamePieces[numInitial];
                    this.gamePieces[numInitial] = this.gamePieces[numTarget];
                    this.gamePieces[numTarget] = temp;

                    return true;
                }else{
                    //not okay to swap
                    this.setState(GameBoard.states.swapping);
                    return false;
                }
            }

            this.match = function(){
                for(var row = 0; row < GameBoard.rows; row++){
                    if(this.rangeEnd == "") {
                        //length of array - 3 for last matching in row
                        this.rangeEnd = this.gamePieces.length - 3;
                    }else{
                        this.rangeEnd = this.rangeStart  - 3;
                    }

                    this.rangeStart = this.rangeEnd - GameBoard.cols + 3;

                    for (var piece = this.rangeStart; piece <= this.rangeEnd; piece++) {
                        if (this.gamePieces[piece].shape == this.gamePieces[piece+1].shape && this.gamePieces[piece+1].shape == this.gamePieces[piece+2].shape){
                                this.matchMade = true;
                                if(this.initialMatch){
                                    this.gamePieces[piece+1].setNextShape();
                                    this.gamePieces[piece+2].setNextShape();
                                }
                        }
                    }
                }

                this.rangeEnd = "";
                this.rangeStart = "";

                for(var col = 0; col < GameBoard.cols; col++){
                    this.rangeEnd = col + ((GameBoard.rows-3)*GameBoard.cols);
                    for(piece = col; piece <= this.rangeEnd; piece = piece + GameBoard.rows){
                        if(this.gamePieces[piece].shape == this.gamePieces[piece+GameBoard.rows].shape && this.gamePieces[piece+GameBoard.rows].shape == this.gamePieces[piece+(GameBoard.rows*2)].shape){
                            this.matchMade = true;
                            if(this.initialMatch){
                                this.gamePieces[piece+GameBoard.rows].setNextShape();
                                this.gamePieces[piece+GameBoard.rows*2].setNextShape();
                            }
                        }
                    }
                }

                this.rangeEnd = "";
                this.rangeStart = "";

                if (this.matchMade){
                    this.matchMade = false;
                    if (this.initialMatch) this.match();
                    this.matchMade = false;
                    this.initialMatch = false;
                    return true;
                }else{
                    this.initialMatch = false;
                    return false;
                }
            }

            this.drop = function(){

            }
            //End Instance Methods

            //Constructor
            for (var piece = 0; piece < GameBoard.rows * GameBoard.cols; piece++) {
                    this.gamePieces[piece] = new GamePiece();
                    this.target.append("<img src='"+GamePiece.shapes[this.gamePieces[piece].shape].url+"' />");
            }
            //End Constructor            
        }

        //Public Static Members
        GameBoard.states = {
            idle: {'name':'idle'},
            swapping: {'name':'swapping'},
            matching: {'name':'matching'},
            dropping: {'name':'dropping'}
        };

        GameBoard.rows = 8;
        GameBoard.cols = 8;
        //End Public Static Members
    //End Class: GameBoard *---------------------------------------------------

    //Class: View *------------------------------------------------------------
        function View(gameBoard){
            //Instance Members
            this.initialGamePiece = "";
            this.targetGamePiece = "";
            this.initialMatch = true;
            //End Instance Members

            //Instance Methods
            this.setInitialGamePiece = function(piece){
                this.initialGamePiece = piece;
            }
            this.getInitialGamePiece = function(){
                return this.initialGamePiece;
            }

            this.setTargetGamePiece = function(piece){
                this.targetGamePiece = piece;
            }
            this.getTargetGamePiece = function(){
                return this.targetGamePiece;
            }

            this.swap = function(){
                var temp = this.initialGamePiece.clone();
                this.initialGamePiece.replaceWith(this.targetGamePiece.replaceWith(temp));
                this.initialGamePiece = temp;
            }

            this.match = function(){
                for (var piece = 0; piece < gameBoard.gamePieces.length; piece++) {
                    if(this.initialMatch){
                        gameBoard.target.children().eq(piece).attr("src",GamePiece.shapes[gameBoard.gamePieces[piece].shape].url);
                    }
                }
                if(this.initialMatch){
                    gameBoard.setState(GameBoard.states.idle);
                    this.initialMatch = false;
                }
            }

            this.drop = function(){

            }
            //End Instance Methods

            //Constructor

            //End Constructor            
        }

        //Public Static Members

        //End Public Static Members
    //End Class: View *--------------------------------------------------------

        $(document).ready(function() {
            var bejeweled = new GameBoard();
            var view = new View(bejeweled);
            bejeweled.match();
            view.match();

            $("#gameboard img").click(function(){
                if (bejeweled.getState() == GameBoard.states.idle){
                    if (bejeweled.getInitialGamePiece() == "") {
                        bejeweled.setState(GameBoard.states.swapping);
                        $(this).toggleClass("glow");
                        bejeweled.setInitialGamePiece($(this).index());
                        view.setInitialGamePiece($(this));                    
                    }
                    return;
                }

                if (bejeweled.getState() == GameBoard.states.swapping){
                    if(view.getInitialGamePiece().index() == $(this).index()){
                        bejeweled.setState(GameBoard.states.idle);
                        view.getInitialGamePiece().toggleClass("glow");
                        bejeweled.setInitialGamePiece("");
                        view.setInitialGamePiece("");
                        return;
                    }else if(view.getInitialGamePiece().index() != $(this).index()){
                        bejeweled.setTargetGamePiece($(this).index());
                        if(bejeweled.swap()){
                            view.setTargetGamePiece($(this));
                            view.initialGamePiece.removeClass("glow");
                            $(this).removeClass("glow");
                            view.swap();
                        }
                    }
                }
            });
        });