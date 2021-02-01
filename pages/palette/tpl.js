export default class ImageExample {
    palette({

    }) {
        //const hasQpon = qponList && qponList.length > 0;
        const image = `/pages/palette/default_goods.png`
 
        const tplhh = {
            children: [{
                type: 'rect',
                css: {
                    // background: '#FEFDFD',
                    // background: `linear-gradient(0deg, ${background} 0%, ${background} 50%)`,
                    // background:'#EEE685',
                    color: '#EEB4B4',
                    width: '350px',
                    height: '428px',
                    top: '56px',
                    left: '32px',
                    rotate: '0',
                    // "borderRadius": "12px",
                    borderRadius: '0px',
                    shadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
                    attrkfkk: 'pfpp'
                },
                children: [
                    {
                        type: 'rect',
                        // "text": '自节点一号',
                        css: {
                            color: '#FFDAB9',
                            width: '302px',
                            height: '180px',
                            rotate: '0',
                            borderRadius: '',
                            borderWidth: '',
                            borderColor: '#000000',
                            shadow: '',
                            // padding: '0px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            maxLines: '2',
                            lineHeight: '28px',
                            textStyle: 'fill',
                            textDecoration: 'none',
                            fontFamily: '',
                            textAlign: 'left',
                            paddingTop: '30px',
                            marginLeft: '30px'
                        },
                        children: [
                            {
                                id: 'title',
                                type: 'text',
                                "text": '子节点1-1',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#00BFFF',
                                    width: '302px',
                                    // height: '128px',
                                    // top: '0px',
                                    // left: '0px', // 
                                    rotate: '0',
                                    borderRadius: '',
                                    borderWidth: '',
                                    borderColor: '#000000',
                                    shadow: '',
                                    // padding: '0px',
                                    // padding:'3px 9px  38px 9px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    maxLines: '2',
                                    lineHeight: '28px',
                                    textStyle: 'fill',
                                    textDecoration: 'none',
                                    fontFamily: '',
                                    textAlign: 'left',
                                    paddingTop: '0px',
                                    marginLeft: '80px',

                                }
                            },
                            {
                                id: 'title',
                                type: 'text',
                                "text": '子节点1-2',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#00E5EE',
                                    width: '302px',
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
                                }
                            },
                            {
                                id: 'title',
                                type: 'text',
                                "text": '子节点1-3',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#4EEE94',
                                    width: '302px',
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
                                }
                            },
                            {
                                id: 'title',
                                type: 'text',
                                "text": '子节点1-4',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#BEBEBE',
                                    width: '302px',
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
                                }
                            },
                            {
                                id: 'title',
                                type: 'text',
                                "text": '子节点1-5',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#696969',
                                    width: '302px',
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
                                    marginLeft: '10px',
                                    paddingLeft: '0px',
                                    paddingTop: '0px',
                                    marginTop:'20px'
                                }
                            },

                        ]
                    },
                    // { 
                    //     type: 'image',
                    //     url: image,
                    //     css: {
                    //         width: '350px',
                    //         height: '350px',
                    //         mode: 'aspectFill',
                    //         borderRadius: '0px',
                    //         marginTop:'10px',

                    //     },
                    // },
                    {
                        type: 'block',
                        css:{
                            // 宽度拉满画布,高度定高或者自适应
                            width: '40%',
                            height: '20px',
                            background: '#F4A460',
                            color:'#F4A460',
                            // marginRight:'40px'
                        },
                        children:[
                            {
                                type: 'text',
                                "text": 'block子节点4-1',
                                css: {
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
                                    marginLeft: '18px'
                                }
                            },
                            {
                                type: 'text',
                                "text": 'block子节点4-2加长加长加长',
                                css: {
                                    color: 'rgba(0,0,0,0.9)',
                                    background: '#458B00',
                                    width: '100%',
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
                                    marginLeft: '18px'
                                }
                            }
                        ]

                    },
                    {
                        type: 'text',
                        "text": '子节点2',
                        css: {
                            color: 'rgba(0,0,0,0.9)',
                            background: '#87CEFA',
                            width: '150px',
                            // height: '58px',
                            rotate: '0',
                            borderRadius: '',
                            borderWidth: '',
                            borderColor: '#000000',
                            shadow: '',
                            padding: '0px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            maxLines: '1',
                            lineHeight: '36px',
                            textStyle: 'fill',
                            textDecoration: 'none',
                            fontFamily: '',
                            textAlign: 'left',
                            marginTop: '10px',
                            marginLeft: '18px'
                        }
                    },
                    {
                        type: 'text',
                        "text": '子节点3',
                        css: {
                            color: 'rgba(0,0,0,0.9)',
                            background: '#87CEFA',
                            width: '150px',
                            // height: '58px',
                            rotate: '0',
                            borderRadius: '',
                            borderWidth: '',
                            borderColor: '#000000',
                            shadow: '',
                            padding: '0px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            maxLines: '1',
                            lineHeight: '36px',
                            textStyle: 'fill',
                            textDecoration: 'none',
                            fontFamily: '',
                            textAlign: 'left',
                            marginTop:'30px',
                            marginLeft: '8px'
                        }
                    },


                ]
            }]
        }
        return { tpl: tplhh };
    }
}
