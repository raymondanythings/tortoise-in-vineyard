import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 304,
    height: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emotionButton: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 21,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 24,
    flex: 1,
    textAlign: 'center',
  },
  recordContainer: {
    flexDirection: 'row',
    width: 212,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 16,
    lineHeight: 24,
    color: '#A0A0A0',
    marginRight: 8,
  },
  line: {
    borderLeftWidth: 1,
    borderColor: '#A0A0A0',
    height: '70%',
    justifyContent: 'center',
    marginTop: 4,
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  emotionText: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -2,
  },
})
