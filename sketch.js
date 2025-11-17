// 變數：用來控制長頸鹿向上偏移的距離
let neckOffset = 0; 
const SCROLL_SPEED = 20; 
// 修正區域：LINE_HEIGHT_PIXELS 必須先定義
const LINE_HEIGHT_PIXELS = 20; // 每行高度

// --- 您的 Text Art (完整且帶有對齊空白) ---

// 1. 頭部 (Head): 
let headArt = `
░░░░░░░░░░░░▄░▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░█▌█░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░█▀▀░▐░░░░░░░░░░░░░░░░░░░░░░░░░`; 

// 2. 全脖子區塊 (Full Neck Art): 16 行
let fullNeckArt =`
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│ㄉ│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│ㄈ│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│生│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│日│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│快│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│樂│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░│！│░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
`; 

// 3. 身體 (Body): 
let bodyArt = `░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░██▄▄▄▄▄▄▄▄▄░▄█▀░░░░░░░░░░░░
░░░░░░░░░░░░░▌░░░░░░░░░░█░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌░▄▄▄▄▄▄░░░▌░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░▐▀█░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░▐░▌░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░▐░▌░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░▐░▌░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░▐░▌░░░░░░░░░░░░░░░░
`; 

// 取得行數
const HEAD_LINES = headArt.trim().split('\n').length; 
const BODY_LINES = bodyArt.trim().split('\n').length; 
const FULL_NECK_LINES = fullNeckArt.trim().split('\n').length; 

// --- 修正區域 ---
// **MAX_OFFSET 現在是動態計算**
const MAX_OFFSET = FULL_NECK_LINES * LINE_HEIGHT_PIXELS; 
// --- 修正區域 ---

// 將 Art 拆分成陣列，用於逐行繪製
const HEAD_ARRAY = headArt.trim().split('\n');
const NECK_SEGMENTS_ARRAY = fullNeckArt.trim().split('\n');
const BODY_ARRAY = bodyArt.trim().split('\n');
const MAX_LINE_WIDTH_CHARS = NECK_SEGMENTS_ARRAY[0].length; 


function setup() {
    createCanvas(windowWidth, windowHeight); 
    textFont('monospace');
    
    textAlign(LEFT, BASELINE); 
    textSize(10); 
    textLeading(LINE_HEIGHT_PIXELS); // 保持與常數一致
    noStroke(); 
}

function draw() {
    background(32, 60, 81); 
    fill(255, 200, 180); 
    
    // 1. 計算要顯示的脖子行數 (順序顯示邏輯)
    let visibleNeckLines = constrain(
        floor(neckOffset / LINE_HEIGHT_PIXELS),
        0, 
        FULL_NECK_LINES 
    ); 
    
    // 2. X 軸繪圖位置
    const CELL_WIDTH = textWidth('░'); 
    const TOTAL_ART_WIDTH = MAX_LINE_WIDTH_CHARS * CELL_WIDTH;
    const CENTER_X = width / 2 ;
    let drawX = CENTER_X; 

    // 3. Y 軸堆疊邏輯 (從上往下繪製)
    
    let totalVisualLines = HEAD_LINES + BODY_LINES + visibleNeckLines;

    // Y 軸起點：讓整個圖案在畫布中垂直置中
    let currentY = height / 2 - (totalVisualLines * LINE_HEIGHT_PIXELS / 2);

    // 應用手動修正：將整個圖案上抬 30 像素，以露出腳部
    const ADJUSTMENT_Y = -30;
    currentY += ADJUSTMENT_Y; 
    
    // --- 繪製長頸鹿 (從上往下，逐行繪製) ---
    
    // 1. 繪製頭部 (4 行)
    for (let i = 0; i < HEAD_LINES; i++) {
        text(HEAD_ARRAY[i], drawX, currentY);
        currentY += LINE_HEIGHT_PIXELS; 
    }

    // 2. 繪製動態伸長的脖子 (visibleNeckLines 行)
    for (let i = 0; i < visibleNeckLines; i++) {
        text(NECK_SEGMENTS_ARRAY[i], drawX, currentY);
        currentY += LINE_HEIGHT_PIXELS; 
    }

    // 3. 繪製身體 (9 行)
    for (let i = 0; i < BODY_LINES; i++) {
        text(BODY_ARRAY[i], drawX, currentY);
        currentY += LINE_HEIGHT_PIXELS; 
    }


    // --- 繪製地面和提示 ---
    
    // 地平線
    fill(76, 175, 80); 
    // 地平線 Y 座標：在身體底部（currentY 目前的位置）上方減去半行高度
    rect(0, currentY - LINE_HEIGHT_PIXELS * 0.5, width, height / 2); 
    
    // 文字提示
    fill(200);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`脖子長度: ${visibleNeckLines} / ${FULL_NECK_LINES} 行 (滾動滑鼠來伸長或縮短)`, width / 2, 50);
}

// *** 關鍵互動函式：滑鼠滾動事件 (保持不變) ***
function mouseWheel(event) {
    if (event.delta < 0) {
        neckOffset += SCROLL_SPEED;
    } else {
        neckOffset -= SCROLL_SPEED;
    }
    
    // 使用動態計算的 MAX_OFFSET
    neckOffset = constrain(neckOffset, 0, MAX_OFFSET); 
    
    redraw(); 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}