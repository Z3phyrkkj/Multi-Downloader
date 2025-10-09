<<<<<<< HEAD
class DurationParser {
  static SECONDS_IN_HOUR = 3600
  static SECONDS_IN_MINUTE = 60
  static DURATION_REGEX = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/

  static parseVideoDuration(durationStr) {
    if (!durationStr) return null

    const match = durationStr.match(this.DURATION_REGEX)
    if (!match) return null

    const hours = parseInt(match[1]) || 0
    const minutes = parseInt(match[2]) || 0
    const seconds = parseInt(match[3]) || 0

    return (hours * this.SECONDS_IN_HOUR) + 
           (minutes * this.SECONDS_IN_MINUTE) + 
           seconds
  }

  static formatDuration(seconds) {
    if (!seconds || seconds < 0) return '00:00'

    const hours = Math.floor(seconds / this.SECONDS_IN_HOUR)
    const minutes = Math.floor((seconds % this.SECONDS_IN_HOUR) / this.SECONDS_IN_MINUTE)
    const remainingSeconds = seconds % this.SECONDS_IN_MINUTE

    if (hours > 0) {
      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`
    }

    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`
  }

  static padZero(num) {
    return num.toString().padStart(2, '0')
  }
}

module.exports = DurationParser
=======
/**
 * Serviço responsável por analisar e converter durações de vídeo
 */

exports.parseVideoDuration = (durationStr) => {
  if (!durationStr) return null;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
