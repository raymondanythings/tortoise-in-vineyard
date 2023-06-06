import { Emotion as E } from '../../graphql/generated'

export default {
  ANGRY: require('../assets/bigEmotion/angry.png'),
  EXCITED: require('../assets/bigEmotion/excited.png'),
  GLOOMY: require('../assets/bigEmotion/gloomy.png'),
  HAPPY: require('../assets/bigEmotion/happy.png'),
  IRRITATED: require('../assets/bigEmotion/irritated.png'),
  LETHARGIC: require('../assets/bigEmotion/lethargic.png'),
  PLEASED: require('../assets/bigEmotion/pleased.png'),
  PROUD: require('../assets/bigEmotion/proud.png'),
  UNSTABLE: require('../assets/bigEmotion/unstable.png'),
}

export interface Emotion {
  value: E | ''
  text: string
  bgColor: string
  color: string
}

export const emotions: Emotion[] = [
  { value: E.Pleased, text: '기쁜', bgColor: '#FFFBE0', color: '#FFE231' },
  { value: E.Proud, text: '뿌듯한', bgColor: '#FFF5EA', color: '#FCBC72' },
  { value: E.Happy, text: '행복한', bgColor: '#FDF6F5', color: '#F3C4BE' },
  { value: E.Excited, text: '신나는', bgColor: '#F6F3F9', color: '#C2B1D5' },
  { value: E.Irritated, text: '짜증나는', bgColor: '#F5F7F8', color: '#BCCACD' },
  { value: E.Unstable, text: '불안한', bgColor: '#FAF1EC', color: '#DDA17D' },
  { value: E.Lethargic, text: '무기력한', bgColor: '#F3F8F5', color: '#AFD1B9' },
  { value: E.Gloomy, text: '우울한', bgColor: '#EFF8FA', color: '#92CEDE' },
  { value: E.Angry, text: '화나는', bgColor: '#FFEAE3', color: '#FD7247' },
]
