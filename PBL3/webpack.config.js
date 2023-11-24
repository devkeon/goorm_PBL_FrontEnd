const path = require('path');

module.exports = {
    entry: './src/script.js',
    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
},

  // 💡 추가설정들
    watch: true, // 파일 수정 후 저장시 자동으로 다시 빌드
    experiments: {
    topLevelAwait: true // 모듈 await 가능하도록
    }
};