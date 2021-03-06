import TopicAnim from './_topicAnim';
import { WIN, HTMLBODY, BODY } from '../_constants';

export default class Preloader {

  constructor(options) {
    this._counterDuration = options.counterDuration;
    this._storeFlug = null;
  }
  logo() {
    const counterFirstGroup = { score: 1 };
    const counterSecondGroup = { score: 1 };
    const counterThirdGroup = { score: 1 };
    const counterFourthGroup = { score: 1 };

    const scoreFirstGroup = $('[data-first-group-path-id]').length - 1;
    const scoreSecondGroup = $('[data-second-group-path-id]').length - 1;
    const scoreThirdGroup = $('[data-third-group-path-id]').length - 1;
    const scoreFourthGroup = $('[data-fourth-group-path-id]').length - 1;

    const playFirstGroup = () => {
      TweenLite
        .to(counterFirstGroup, this._counterDuration, { 
          score:'+='+scoreFirstGroup+'', 
          roundProps:'score', 
          onUpdate: updateFirstGroup, 
          onComplete: playSecondGroup,
          ease: Linear.easeNone
        });
    };
    const updateFirstGroup = () => {
      $('[data-first-group-path-id]').removeClass('is-active');
      $('[data-first-group-path-id="'+counterFirstGroup.score+'"]').addClass('is-active');
    };

    const playSecondGroup = () => {
      TweenLite
        .to(counterSecondGroup, this._counterDuration, { 
          score:'+='+scoreSecondGroup+'', 
          roundProps:'score', 
          onUpdate: updateSecondGroup, 
          onComplete: playThirdGroup,
          ease: Linear.easeNone
        });
    };
    const updateSecondGroup = () => {
      $('[data-second-group-path-id]').removeClass('is-active');
      $('[data-second-group-path-id="'+counterSecondGroup.score+'"]').addClass('is-active');
    };

    const playThirdGroup = () => {
      TweenLite
        .to(counterThirdGroup, this._counterDuration, { 
          score:'+='+scoreThirdGroup+'', 
          roundProps:'score', 
          onUpdate: updateThirdGroup, 
          onComplete: playFourthGroup,
          ease: Linear.easeNone
        });
    };
    const updateThirdGroup = () => {
      $('[data-third-group-path-id]').removeClass('is-active');
      $('[data-third-group-path-id="'+counterThirdGroup.score+'"]').addClass('is-active');
    };

    const playFourthGroup = () => {
      TweenLite
        .to(counterFourthGroup, this._counterDuration, {
          score: '+='+scoreFourthGroup+'', 
          roundProps:'score', 
          onUpdate: updateFourthGroup, 
          onComplete: this.finishAnimation,
          ease: Linear.easeNone
        });
    };
    const updateFourthGroup = () => {
      $('[data-fourth-group-path-id]').removeClass('is-active');
      $('[data-fourth-group-path-id="'+counterFourthGroup.score+'"]').addClass('is-active');
    };

    playFirstGroup();
  }
  
  progress() {
    const progress = $('.js-progress');
    const progressInner = $('.js-progress-inner');
    const progressWidth = progress.width();
    TweenLite.to(progressInner, this._counterDuration * 4, { 
      width: progressWidth, 
      ease: Power4.easeIn
    });

  }

  gragient() {
    const gragientBlock = $('.js-preloader-gragient');
    TweenLite.to(gragientBlock, this._counterDuration * 5, { 
      alpha: 0,
      ease: Linear.easeNone
    });
  }

  finishAnimation() {
    const logo = $('.js-preloader-logo');
    const preloader = $('.js-preloader');
    new TimelineMax()
      .to(logo, 1, {
        y: -50,
        alpha: 0,
        ease: Power1.easeInOut
      }, 0.5)
      .to(preloader, 0.8, {
        alpha: 0,
        ease: Power1.easeInOut
      }, 1.2)
      .call( () => {
        const disclaimer = BODY.find('.js-disclaimer');
        if (disclaimer.length) return;
        TopicAnim.play();
      }, null, null, 1 )
      .eventCallback( 'onComplete', () => {
        HTMLBODY.animate(() => {
          scrollTop: 0;
        }, 0);
        preloader.remove();
      });
  }

  init() {
    const preloader = $('.js-preloader');
    if (!preloader.length) return;
    if (!this._storeFlug) {
      window.sessionStorage.setItem('preloader',true);
      this._storeFlug = window.sessionStorage.getItem('preloader');

      this.gragient();
      this.logo();
      this.progress();
    }
    else {
      const preloader = $('.js-preloader');
      TopicAnim.play();
      HTMLBODY.animate(() => {
        scrollTop: 0;
      }, 0);
      preloader.remove();
    }
  }
}
