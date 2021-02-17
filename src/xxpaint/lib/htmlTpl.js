/* eslint-disable */
const wxml2 = `
<rect class="wrapper" >
  <rect class="container">
    <text class="text color1">子节点1-1</text>
    <text class="text color2">子节点1-2</text>
    <text class="text color3">子节点1-3</text>
    <text class="text color4">子节点1-4</text>
    <text class="text color5">子节点1-5</text>
  </rect>  
  <image class="img" src="/pages/palette/default_goods.png"></image>
  <block class="bloo" >
    <text class="text2">block子节点4-1</text>
    <text class="text2">block子节点4-2</text>
  </block>
  <rect class="container transparent"></rect>
</rect>
`;


const wxml = `
<rect class="wrapper" >
<image class="img" src="/pages/palette/default_goods.png"></image>
<block class="bloo" >
  <text class="text2">block子节点4-1</text>
  <text class="text2">block子节点4-2</text>
</block>

</rect>
`;
const style = {
  wrapper: {
    // background: '#FEFDFD',
    // background: `linear-gradient(0deg, ${background} 0%, ${background} 50%)`,
    // background:'#EEE685',
    color: '#EEB4B4',
    width: '350px',
    height: '0px',
    top: '56px',
    left: '32px',
    rotate: '0',
    // "borderRadius": "12px",
    borderRadius: '0px',
    shadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
    attrkfkk: 'pfpp',
  },
  container: {
    color: '#FFDAB9',
    background: '#BEBEBE',
    width: '302px',
    height: '180px',
    rotate: '0',
    borderRadius: '',
    borderWidth: '',
    borderColor: '#000000',
    shadow: '',
    padding: '0px',
    // padding:'3px 9px  38px 9px',
    fontSize: '14px',
    fontWeight: 'bold',
    maxLines: '2',
    lineHeight: '28px',
    textStyle: 'fill',
    textDecoration: 'none',
    fontFamily: '',
    textAlign: 'left',
    // marginLeft:'40px',
    paddingLeft: '0px',
    paddingTop: '0px',
  },
  bloo: {
    // 宽度拉满画布,高度定高或者自适应
    width: '40%',
    height: '20px',
    background: '#F4A460',
    color: '#F4A460',
    marginTop: '10px',
  },
  text: {
    color: 'rgba(0,0,0,0.9)',
    background: '#00BFFF',
    // width: '302px',
    rotate: '0',
    borderRadius: '',
    borderWidth: '',
    borderColor: '#000000',
    shadow: '',
    fontSize: '14px',
    fontWeight: 'bold',
    maxLines: '2',
    lineHeight: '28px',
    textStyle: 'fill',
    textDecoration: 'none',
    fontFamily: '',
    textAlign: 'left',
    paddingTop: '0px',
    // marginLeft: '80px',
  },
  text2: {
    color: 'rgba(0,0,0,0.9)',
    background: '#458B00',
    width: '90%',
    // height: '58px',
    rotate: '0',
    borderRadius: '',
    borderWidth: '',
    borderColor: '#000000',
    shadow: '',
    padding: '0px',
    fontSize: '14px',
    fontWeight: 'bold',
    maxLines: '1',
    lineHeight: '20px',
    textStyle: 'fill',
    textDecoration: 'none',
    fontFamily: '',
    textAlign: 'left',
    marginTop: '10px',
    marginLeft: '18px',
  },
  transparent: {
    color: 'rgba(0,0,0,.1)',
  },
  img: {
    width: '120px',
    height: '120px',
    mode: 'aspectFill',
    borderRadius: '0px',
    marginTop: '50px',

  },
  color1: { background: '#87CEFA' },
  color2: { background: '#4682B4' },
  color3: { background: '#548B54' },
  color4: { background: '#9BCD9B' },
  color5: { background: '#FF8247' },

};

module.exports.wxml = wxml;
module.exports.style = style;
