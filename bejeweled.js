    //Class: GamePiece *-------------------------------------------------------
        function GamePiece(){
            //Instance Members
            this.shape = "";
            //End Instance Members

            //Instance Methods
            this.setRandomShape = function(){
                this.shape = Math.floor(Math.random() * GamePiece.shapes.length);
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

            }

            this.match = function(){

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

            }

            this.match = function(){

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
        });