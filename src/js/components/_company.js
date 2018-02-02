import {ACTIVE, widthLG} from '../_constants';

export default {

  show() {
    const title = $('.js-company-title [data-stagger="inner"]');
    const diagram = $('.js-company-diagramm');
    const content = $('.js-company-content');
    if (!title.length) return;
    new TimelineMax()
      .addLabel('start', 0.15)
      .staggerTo(title, 0.6, {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut
      }, 0.15)
      .to([diagram, content], 0.6, {
        opacity: 1
      }, 'start');
  },

  init() {
    $('.js-company').each((i, container) => {
      container = $(container);
      const slider = container.find('.js-company-slider');
      const diagramm = container.find('.js-company-diagramm');
      const diagrammSVG = container.find('.js-company-diagramm svg');
      const dots = container.find('.js-company-dots');
      const bullets = container.find('.js-company-bullet');

      slider
        .slick({
          vertical: true,
          verticalSwiping: true,
          infinite: false,
          arrows: false,
          responsive: [
            {
              breakpoint: widthLG + 1,
              settings: {
                vertical: false,
                verticalSwiping: false,
                infinite: false,
                arrows: false,
                fade: true,
                adaptiveHeight: true
              }
            }
          ]
        })
        .on('beforeChange', (e, slick, prev, next) => {
          next > 0 ? diagramm.add(dots).addClass(ACTIVE) : diagramm.add(dots).removeClass(ACTIVE);
          if (next >= 1) {
            const step = 360/3;
            const id = next-1;
            const angle = step*id;
            bullets
              .removeClass(ACTIVE)
              .eq(id)
              .addClass(ACTIVE);
            diagrammSVG.css('transform', `translate3d(0,0,0) rotate(${-angle}deg)`);
          }
        });

      bullets.on('click', e => {
        e.preventDefault();
        console.log($(e.currentTarget).index() + 1);
        slider.slick('slickGoTo', $(e.currentTarget).index() + 1);
      });
    });
  }

};
