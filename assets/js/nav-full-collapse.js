// assets/js/nav-full-collapse.js
(function($){
  const BREAKPOINT = 819; // width in px where we switch to hamburger

  function syncNav() {
    const $gn = $('.greedy-nav').first();
    if (!$gn.length) return;

    const $visible = $gn.find('.visible-links');
    const $hidden  = $gn.find('.hidden-links');
    const $btn     = $gn.children('button');

    if ($(window).width() <= BREAKPOINT) {
      // Mobile: ensure hidden-links contains a full copy of visible links
      if (!$hidden.data('full-cloned')) {
        $hidden.empty();
        $visible.children('li').each(function(){
          // clone without duplicating event handlers
          const $clone = $(this).clone(false);
          $hidden.append($clone);
        });
        $hidden.data('full-cloned', true);
      }

      // Hide visible list, show the button and ensure hidden-list is initially hidden
      $visible.hide();
      $btn.show();
      $hidden.hide(); // we'll toggle it via the button

      // Hook the button to toggle the hidden-links (avoid double-binding)
      $btn.off('click.navfull').on('click.navfull', function(e){
        e.preventDefault();
        $hidden.slideToggle(150);
      });

      // center the button (in case default CSS doesn't)
      $btn.css({ display: 'block', margin: '0 auto' });

    } else {
      // Desktop: restore visible menu, remove clones & hide button
      $visible.show();
      if ($hidden.data('full-cloned')) {
        $hidden.empty();
        $hidden.removeData('full-cloned');
      }
      $hidden.hide();
      $btn.hide();
      $btn.off('click.navfull');
      $btn.css({ display: '' , margin: '' });
    }
  }

  $(document).ready(function(){
    // run once at load
    syncNav();
    // run on resize (debounced)
    let t = null;
    $(window).on('resize', function(){
      clearTimeout(t);
      t = setTimeout(syncNav, 150);
    });
  });
})(jQuery);