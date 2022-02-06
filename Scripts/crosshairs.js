// JavaScript Document

$.fn.crosshair = function(options)
{
	new $.CrossHairManager(this,options);
}

$.CrossHairManager = function(container, options) {
    var KEY = {
        CNTRL: 17,
        ALT: 18  //Comma removed
      //  SHIFT: 16 //Ians Change
    };

    container = $(container);
    var image = container.find("img");
    var LINE_WIDTH = image.width();
    var LINE_HEIGHT = image.height();
    var TOP = image.offset().top;
    var LEFT = image.offset().left;
    var lineHorizontal = Bar(LINE_WIDTH, options.thickness, LEFT, TOP, options.h_color, options.thickness);
    var lineVertical = Bar(options.thickness, LINE_HEIGHT, LEFT, TOP, options.v_color, options.thickness);
    var h_id = "#" + lineHorizontal.attr('id'), v_id = "#" + lineVertical.attr('id');
    var keyDown = false;
    var mouseEnter1 = false;//Ians Change
    var mouseEnter2 = false;//Ians Change
    //container.css('margin', '8px 20px');
    container.css('padding', '0px');

    container.append(lineHorizontal);
    container.append(lineVertical);
    
    container.mousemove(Move);
    image.click(function() {mouseEnter1 = true;});//Ians Change
    image.mouseover(function() { mouseEnter2 = true; });////Ians Change
    image.mouseout(function() { mouseEnter2 = false; });////Ians Change
   // image.mouseenter(function() { mouseEnter2 = true; });////Ians Change
   // image.mouseout(function() { mouseEnter2 = false; });////Ians Change
    container.bind('dblclick', function() { Hidden(); });
    $(document).bind('keydown', function(evnt) { if (IsValidCode(evnt.keyCode)) { keyDown = true; Visible(); } });
    $(document).bind('keyup', function(evnt) { keyDown = false; });




    //create lines
    function Bar(width, height, posX, posY, color, thick) {
        var dynamicAxis;
        var line = $("<div>");
        var id = 'bar_' + index++;
        dynamicAxis = (width == thick) ? 'top' : 'left';
        line.css('width', width);
	    line.attr('id', id);
	    line.css('height', height);
	    line.css('line-height', '0px');
	    line.css('font-size', '0px');
	    line.css('top', posY);
	    line.css('left', posX);
	    line.css('background-color', color);
	    line.css('position', 'absolute');
		line.css('visibility', 'hidden');
		line.css('z-index', 99);
        return line;
    }

    function IsValidCode(code) {
        switch (code) {
            case KEY.ALT: return true;
            case KEY.CNTRL: return true;
             //case KEY.SHIFT: return true; //Ians Change
            default: return false;
        }
    }

    function Move(evnt) {
        if (keyDown && $(h_id).css('visibility') == "visible" && mouseEnter1 && mouseEnter2) //Ians Change
        {
            //crack for IE7
            if ($.browser.msie) {
                document.getElementById(h_id.substr(1)).style.top = evnt.pageY;
                document.getElementById(v_id.substr(1)).style.left = evnt.pageX;
            } else {
                $(h_id).css('top', evnt.pageY);
                $(v_id).css('left', evnt.pageX);
            }
        }
    }
    function Visible() {
        if (keyDown && mouseEnter1 && mouseEnter2) //Ians Change
        {
            Show();
        }
    }

    function Hidden() {
        Hide();
    }
    function Show() {
        $(h_id).css('visibility', 'visible');
        $(v_id).css('visibility', 'visible');
    }
    function Hide() {
        $(h_id).css('visibility', 'hidden');
        $(v_id).css('visibility', 'hidden');
    }
    
    
}