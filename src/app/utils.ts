import {Languages} from './services/nav.service';

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function getLangNewlines(text: Languages): Languages {
    if (text) {
      return {
        english: text.english ? text.english.replace(/\r\n/g, '<br>') : '',
        hindi: text.hindi ? text.hindi.replace(/\r\n/g, '<br>') : ''
      };
    }
    return {
      english: '',
      hindi: ''
    };
  }

export function getOrderStatusColor(status: string, actualStatus?: string): string {
    if (actualStatus && actualStatus !== status) {
      return '#555';
    }
    if (status === 'pending') {
      return '#a82';
    }
    if (status === 'processing') {
      return '#28a';
    }
    if (status === 'completed') {
      return '#690';
    } else {
      return '#000';
    }
  }

export function capitalizeFirstLetter(str: string) {
    return str[0].toUpperCase() + str.substring(1);
  }
