import { KnightTravails } from './knightTravails.js';

class KnightVisualization {
    constructor() {
        this.knightTravails = new KnightTravails();
        this.startPosition = null;
        this.endPosition = null;
        this.currentPath = [];
        this.selectionMode = 'start';
        this.isAnimating = false;
        
        this.initializeBoard();
        this.attachEventListeners();
    }

    initializeBoard() {
        const chessboard = document.getElementById('chessboard');
        chessboard.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.className += (row + col) % 2 === 0 ? ' light' : ' dark';
                square.dataset.row = row;
                square.dataset.col = col;
                
                // Add coordinate labels
                const coordinate = document.createElement('span');
                coordinate.className = 'coordinate';
                coordinate.textContent = `${col},${row}`;
                square.appendChild(coordinate);
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                chessboard.appendChild(square);
            }
        }
    }

    attachEventListeners() {
        document.getElementById('selectStart').addEventListener('click', () => {
            this.setSelectionMode('start');
        });
        
        document.getElementById('selectEnd').addEventListener('click', () => {
            this.setSelectionMode('end');
        });
        
        document.getElementById('findPath').addEventListener('click', () => {
            this.findPath();
        });
        
        document.getElementById('clearBoard').addEventListener('click', () => {
            this.clearBoard();
        });
        
        document.getElementById('animatePath').addEventListener('click', () => {
            this.animatePath();
        });
    }

    setSelectionMode(mode) {
        this.selectionMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'start') {
            document.getElementById('selectStart').classList.add('active');
        } else {
            document.getElementById('selectEnd').classList.add('active');
        }
    }

    handleSquareClick(row, col) {
        if (this.isAnimating) return;
        
        const position = [col, row]; // [x, y] format
        
        if (this.selectionMode === 'start') {
            this.setStartPosition(position);
        } else {
            this.setEndPosition(position);
        }
    }

    setStartPosition(position) {
        this.startPosition = position;
        this.updateBoard();
        this.updateInfo();
        
        // Switch to end selection after setting start
        this.setSelectionMode('end');
    }

    setEndPosition(position) {
        this.endPosition = position;
        this.updateBoard();
        this.updateInfo();
    }

    updateBoard() {
        // Clear all special classes
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('start', 'end', 'path');
            const knight = square.querySelector('.knight');
            if (knight) {
                knight.remove();
            }
        });
        
        // Mark start position
        if (this.startPosition) {
            const startSquare = this.getSquareElement(this.startPosition[1], this.startPosition[0]);
            if (startSquare) {
                startSquare.classList.add('start');
                const knight = document.createElement('span');
                knight.className = 'knight';
                knight.textContent = '♞';
                startSquare.appendChild(knight);
            }
        }
        
        // Mark end position
        if (this.endPosition) {
            const endSquare = this.getSquareElement(this.endPosition[1], this.endPosition[0]);
            if (endSquare) {
                endSquare.classList.add('end');
                const knight = document.createElement('span');
                knight.className = 'knight';
                knight.textContent = '♞';
                endSquare.appendChild(knight);
            }
        }
        
        // Mark path
        if (this.currentPath.length > 0) {
            this.currentPath.forEach((position, index) => {
                if (index > 0 && index < this.currentPath.length - 1) {
                    const pathSquare = this.getSquareElement(position[1], position[0]);
                    if (pathSquare) {
                        pathSquare.classList.add('path');
                    }
                }
            });
        }
    }

    getSquareElement(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    updateInfo() {
        const startPosElement = document.getElementById('startPos');
        const endPosElement = document.getElementById('endPos');
        const moveCountElement = document.getElementById('moveCount');
        const pathListElement = document.getElementById('pathList');
        
        startPosElement.textContent = this.startPosition ? 
            `(${this.startPosition[0]}, ${this.startPosition[1]})` : 'Not selected';
        endPosElement.textContent = this.endPosition ? 
            `(${this.endPosition[0]}, ${this.endPosition[1]})` : 'Not selected';
        
        if (this.currentPath.length > 0) {
            const moves = this.currentPath.length - 1;
            moveCountElement.textContent = `${moves} move${moves !== 1 ? 's' : ''}`;
            
            // Display path
            pathListElement.innerHTML = this.currentPath
                .map((pos, index) => `${index}: [${pos[0]}, ${pos[1]}]`)
                .join('<br>');
                
            document.getElementById('animatePath').disabled = false;
        } else {
            moveCountElement.textContent = '-';
            pathListElement.innerHTML = '';
            document.getElementById('animatePath').disabled = true;
        }
        
        // Enable/disable find path button
        document.getElementById('findPath').disabled = !this.startPosition || !this.endPosition;
    }

    findPath() {
        if (!this.startPosition || !this.endPosition) {
            return;
        }
        
        try {
            this.currentPath = this.knightTravails.findPath(this.startPosition, this.endPosition);
            this.updateBoard();
            this.updateInfo();
            
            // Highlight the path with animation
            this.highlightPath();
        } catch (error) {
            console.error('Error finding path:', error);
            this.showMessage('Error finding path. Please try again.');
        }
    }

    highlightPath() {
        if (this.currentPath.length === 0) return;
        
        this.currentPath.forEach((position, index) => {
            setTimeout(() => {
                const square = this.getSquareElement(position[1], position[0]);
                if (square) {
                    square.classList.add('animated');
                    setTimeout(() => {
                        square.classList.remove('animated');
                    }, 500);
                }
            }, index * 100);
        });
    }

    async animatePath() {
        if (this.currentPath.length === 0 || this.isAnimating) return;
        
        this.isAnimating = true;
        document.getElementById('animatePath').disabled = true;
        
        // Clear existing knights
        document.querySelectorAll('.knight').forEach(knight => knight.remove());
        
        for (let i = 0; i < this.currentPath.length; i++) {
            const position = this.currentPath[i];
            const square = this.getSquareElement(position[1], position[0]);
            
            if (square) {
                // Add knight with animation
                const knight = document.createElement('span');
                knight.className = 'knight knight-moving';
                knight.textContent = '♞';
                square.appendChild(knight);
                
                // Highlight current position
                square.classList.add('animated');
                
                // Wait for animation
                await this.sleep(600);
                
                // Remove highlight but keep knight
                square.classList.remove('animated');
            }
        }
        
        this.isAnimating = false;
        document.getElementById('animatePath').disabled = false;
    }

    clearBoard() {
        this.startPosition = null;
        this.endPosition = null;
        this.currentPath = [];
        this.isAnimating = false;
        
        this.updateBoard();
        this.updateInfo();
        this.setSelectionMode('start');
    }

    showMessage(message) {
        // Create a simple toast message
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KnightVisualization();
});
