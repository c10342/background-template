import React, {Component} from 'react';
import Texty from 'rc-texty';
import './index.css'
import 'rc-texty/assets/index.css';

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='home'>
                <div className='top'>
                    <div>
                        <div><Texty interval={200} delay={500} type={'swing-rotate'}>注册总量</Texty></div>
                        <div><Texty interval={200} delay={500}>395</Texty></div>
                    </div>
                    <div>
                        <div><Texty interval={200} delay={500} type={'flash'}>群提交量</Texty></div>
                        <div><Texty interval={200} delay={500}>395</Texty></div>
                    </div>
                    <div>
                        <div><Texty interval={200} delay={500} type={'bounce'}>新增举报</Texty></div>
                        <div><Texty interval={200} delay={500}>395</Texty></div>
                    </div>
                </div>
                <div className="bottom">
                    <div className='left'>
                        <div className='left-top'>
                            <div><Texty type={'scaleBig'} interval={200} delay={500}>用户增长</Texty></div>
                            <div></div>
                        </div>
                        <div className='left-top matop10'>
                            <div><Texty type={'mask-top'} interval={200} delay={500}>群提交增量</Texty></div>
                            <div></div>
                        </div>
                    </div>
                    <div className='right'>
                        <div><Texty type={'scale'} interval={200} delay={500}>用户活跃排行</Texty></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
