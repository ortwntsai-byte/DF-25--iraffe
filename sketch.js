// 變數：用來控制長頸鹿向上偏移的距離
let neckOffset = 0; 
const SCROLL_SPEED = 20; 
// 修正區域：LINE_HEIGHT_PIXELS 必須先定義
const LINE_HEIGHT_PIXELS = 20; // 每行高度

// ---Text Art---
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
░░░░░░░░░░░░│　│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│祝│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│・│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│林│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│ㄉ│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│ㄈ│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│廿│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│五│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│歲│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│生│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│日│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│快│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│樂│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│！│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░│！│░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▌▐░░░░░░░░░░░░░░░░░░░░░░░░░
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

// 動態計算MAX_OFFSET
const MAX_OFFSET = FULL_NECK_LINES * LINE_HEIGHT_PIXELS; 

// 將 Art 拆分成陣列，用於逐行繪製
const HEAD_ARRAY = headArt.trim().split('\n');
const NECK_SEGMENTS_ARRAY = fullNeckArt.trim().split('\n');
const BODY_ARRAY = bodyArt.trim().split('\n');
const MAX_LINE_WIDTH_CHARS = NECK_SEGMENTS_ARRAY[0].length; 


// --- 繪製閃爍四角文字 ---

let flashState = 0; // 全局變數保持不變
function drawFlashingCorners(artStartX, artStartY, artEndX, artEndY) {
    
    // 1. 更新閃爍狀態
    flashState = (flashState + 1) % 40; 
    
    // 2. 設定閃爍顏色
    if (flashState < 20) { 
        fill(255, 0, 0); // 紅色
    } else { 
        fill(255); // 白色
    }

    // 3. 設定文字樣式
    textSize(55); 
    textAlign(CENTER, CENTER); 
    textFont('"KaiTi", "Microsoft JhengHei", serif');
    
    const PADDING = 45; // 邊界擴大 30 像素
    
    const L = artStartX - PADDING;
    const R = artEndX + PADDING;
    const UP = artStartY-10;
    const DOWN = artEndY-45;

    const distanceX = L-R;
    const distanceY = UP-DOWN;


    // 4. 繪製四個角文字
    text("伸", L, UP); // 左1
    text("縮", L, UP - distanceY*0.34); // 左2
    text("頸", L, UP - distanceY*0.67); // 左3
    text("鹿", L, DOWN); // 左4

    text("向", R, UP); // 左上
    text("您", R, UP - distanceY*0.34); // 右上
    text("祝", R, UP - distanceY*0.67); // 左下
    text("壽", R, DOWN); // 右下

    // 6. 繪製完畢，不需要恢復設定，因為 draw() 函式稍後會恢復。
}



function setup() {
    createCanvas(windowWidth, windowHeight); 
    textFont('monospace');
    
    textAlign(CENTER, BASELINE); 
    textSize(10); 
    textLeading(LINE_HEIGHT_PIXELS); // 保持與常數一致
    noStroke(); 
}

function draw() {
    background(6, 92, 89); 
    fill(25, 200, 180); 
    
    // 1. 計算要顯示的脖子行數 (順序顯示邏輯)
    let visibleNeckLines = constrain(
        floor(neckOffset / LINE_HEIGHT_PIXELS),
        0, 
        FULL_NECK_LINES 
    ); 
    
    // 2. X 軸繪圖位置和寬度計算 (只計算一次)
    const CELL_WIDTH = textWidth('░'); 
    const TOTAL_ART_WIDTH = MAX_LINE_WIDTH_CHARS * CELL_WIDTH;
    const CENTER_X = width / 2 ;
    let drawX = CENTER_X; // 整個 Art 的中心

    // 3. Y 軸堆疊邏輯 (計算 Art 邊界)
    let totalVisualLines = HEAD_LINES + BODY_LINES + visibleNeckLines;

    // Y 軸起點：讓整個圖案在畫布中垂直置中
    let currentY = height / 2 - (totalVisualLines * LINE_HEIGHT_PIXELS / 2);

    // 應用手動修正：將整個圖案上抬 30 像素
    //const ADJUSTMENT_Y = -30;
    //currentY += ADJUSTMENT_Y; 
    
    // --- 【邊界參數定義】---
    const ART_END_X = drawX + (TOTAL_ART_WIDTH/2); 
    const ART_START_Y = currentY; // 整個 Art 的 Y 軸頂部
    const ART_END_Y = ART_START_Y + totalVisualLines * LINE_HEIGHT_PIXELS; // 整個 Art 的 Y 軸底部
    
    
    // --- 2. 呼叫新的閃爍函式 ---
    if (neckOffset >= MAX_OFFSET-280) {
    drawFlashingCorners((drawX-TOTAL_ART_WIDTH/2), ART_START_Y, ART_END_X, ART_END_Y);
    }
    //左邊界、上邊界、右邊界、下邊界
    
    // --- 3. 恢復 Text Art 的繪圖設定 ---
    fill(255, 200, 180); // 恢復長頸鹿顏色
    textSize(LINE_HEIGHT_PIXELS); // 恢復為小字體
    textAlign(CENTER, BASELINE); // 恢復為左對齊
    textFont('monospace');
    
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

    // 1. 設定文字樣式和顏色
    fill(255); // 白色
    textSize(14);      // 稍微大一點
    textAlign(CENTER, BOTTOM); // 居中對齊，並以底部為基準
    textFont('KaiTi, "Microsoft JhengHei", serif');
    
    // 2. 設定位置 (放在畫布底部上方 20 像素處)
    const bottomY = height - 20; 
    
    text("< 滾動滑鼠滾輪，伸縮頸鹿的脖子 >", width / 2, ART_END_Y + 30);
    
    // 【恢復設置 (可選)】
    textFont('monospace');


    
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