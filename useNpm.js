// import path from 'path';
// import * as CI from 'miniprogram-ci';
const path = require('path');
const CI = require('miniprogram-ci');
// import CIProject from '../CIProject';
async function _buildNpm(opts = {}) {
  console.log('>>> 开始构建npm包');
  const packageJsonPath = opts.packageJsonPath || './package.json';
  const miniprogramNpmDistDir = opts.miniprogramNpmDistDir || './dist/';
  let packResult;
  try {
    packResult = await CI.packNpmManually({
      packageJsonPath,
      miniprogramNpmDistDir,
    });
  } catch (e) {
    console.log(`NPM 构建失败: ${e}`);
  }
  console.log('pack done, packResult:', packResult);
}
async function useNpm(projectPath = '', miniprogramNpmDistDir = '') {
  const packageJsonPath = path.resolve(projectPath, 'package.json');
  await _buildNpm({ packageJsonPath, miniprogramNpmDistDir });
}
(async () => {
  console.log('>>> 开始构建npm');
  await useNpm();
})();
