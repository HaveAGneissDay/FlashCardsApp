$(document).ready(function() {
  setTimeout (function () {
$(".frostdiv").addClass("frosty")
  }, 0)


	 $(function() {

        var $el = $( '#baraja-el' ),
          baraja = $el.baraja();

        // navigation
        $( '#nav-prev' ).on( 'click', function( event ) {

          baraja.previous();
        
        } );

        $( '#nav-next' ).on( 'click', function( event ) {

          baraja.next();
        
        } );

        // simple fan
        $( '#nav-fan' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 90,
            direction : 'right',
            origin : { x : 25, y : 100 },
            center : true
          } );
        
        } );

        $( '#nav-fan2' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 90,
            direction : 'left',
            // note that the x origin changes (symmetric)
            origin : { x : 75, y : 100 },
            center : true
          } );
        
        } );

        // more realistic fan: without common origin (means the origin changes / increments by card )
        $( '#nav-fan3' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 90,
            direction : 'right',
            origin : { minX : 20, maxX : 80, y : 100 },
            center : true,
            translation : 60
          } );
        
        } );

        $( '#nav-fan4' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 90,
            direction : 'left',
            origin : { minX : 20, maxX : 80, y : 100 },
            center : true,
            translation : 60
          } );
        
        } );

        // playing with different origins and ranges  
        $( '#nav-fan5' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 100,
            direction : 'right',
            origin : { x : 50, y : 200 },
            center : true
          } );
        
        } );

        $( '#nav-fan6' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 80,
            direction : 'left',
            origin : { x : 200, y : 50 },
            center : true
          } );
        
        } );

        // center false, playing with translation
        $( '#nav-fan7' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 20,
            direction : 'right',
            origin : { x : 50, y : 200 },
            center : false,
            translation : 300
          } );
        
        } );

        $( '#nav-fan8' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 20,
            direction : 'left',
            origin : { x : 50, y : 200 },
            center : false,
            translation : 300
          } );
        
        } );

        // using scatter : true
        $( '#nav-fan9' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 20,
            direction : 'right',
            origin : { x : 50, y : 200 },
            center : false,
            translation : 300,
            scatter : true
          } );
        
        } );

        $( '#nav-fan10' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 20,
            direction : 'left',
            origin : { x : 50, y : 200 },
            center : false,
            translation : 300,
            scatter : true
          } );
        
        } );

        $( '#nav-fanOther1' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 130,
            direction : 'left',
            origin : { x : 25, y : 100 },
            center : false
          } );
        
        } );

        $( '#nav-fanOther2' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 360,
            direction : 'left',
            origin : { x : 50, y : 90 },
            center : false
          } );
        
        } );

        $( '#nav-fanOther3' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 330,
            direction : 'left',
            origin : { x : 50, y : 100 },
            center : true
          } );
        
        } );

        $( '#nav-fanOther4' ).on( 'click', function( event ) {

          baraja.fan( {
            speed : 500,
            easing : 'ease-out',
            range : 90,
            direction : 'right',
            origin : { minX : 20, maxX : 80, y : 100 },
            center : true,
            translation : 60,
            scatter : true
          } );
        
        } );

        // close the baraja
        $( '#close' ).on( 'click', function( event ) {

          baraja.close();
        
        } );

        // example of how to add more items
        $( '#add' ).on( 'click', function( event ) {

          if( $( this ).hasClass( 'disabled' ) ) {
            return false;
          }

          $( this ).addClass( 'disabled' );

          baraja.add( $('<li><img src="images/6.jpg" alt="image6"/><h4>Serenity</h4><p>Truffaut wes anderson hoodie 3 wolf moon labore, fugiat lomo iphone eiusmod vegan.</p></li><li><img src="images/7.jpg" alt="image7"/><h4>Dark Honor</h4><p>Chillwave mustache pinterest, marfa seitan umami id farm-to-table iphone.</p></li><li><img src="images/8.jpg" alt="image8"/><h4>Nested Happiness</h4><p>Minim post-ironic banksy american apparel iphone wayfarers.</p></li><li><img src="images/9.jpg" alt="image9"/><h4>Cherry Country</h4><p>Sint vinyl Austin street art odd future id trust fund, terry richardson cray.</p></li>') );
        
        } );

      });
});


// $('#textarea1').val('New Text');
//   $('#textarea1').trigger('autoresize');

//    $('#textarea2').val('New Text');
//   $('#textarea2').trigger('autoresize');


