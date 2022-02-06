	
	/**************************************************************************************************************
    **
    ** For masking keys key code please check 
    ** http://www.cambiaresearch.com/c4/702b8cd1-e5b0-42e6-83ac-25f0306e3e25/Javascript-Char-Codes-Key-Codes.aspx
    ** Currently key 'A' (keyCode = 65) is used for 'positiveMaskKeyCode' and key 'B' (keyCode = 66) is used for 
    ** 'negetiveMaskKeyCode'. Double click is used for clearing the canvas.
    ** KEYS USED:
    **** X - 88 (Angle generator - Negetive)
    **** Z - 90 (Angle generator - Positive)
    **** Y - 89 (Second options for CYCLE, RETRACEMENT, RETRACEMENT FAN, PRICE EXPANSION, TIME EXPANSION, GANN ANGLES, GANN FANN}
    **** D - 68 (Arrow generator - Down)
    **** U - 85 (Arrow generator - Up)
    **** P - 80 (PinchFork generator - With middle Lines)
    **** C - 67 (Channel generator - With middle Lines)
    **** Q - 81 (Retracement generator)
    **** T - 84 (Trendline generator Ray ADDED DEGREES while Y key down 2021-04-21)
    **** G - 71 (Trendline generator Basic)
    **** F - 70 (Trendline generator Full)
    **** A - 65 (Price Expansion generator)
    **** N - 78 (Bull Bear - Grid Only)
    **** M - 77 (Bull Bear - Arc Only)
    **** J - 74 (Bull Bear - Arc & Angle Only)
    **** K - 75 (Bull Bear - Arc, Angle & Grid Only)
    **** V - 86 (Vertical Line)
    **** H - 72 (Horizontal Line)
    **** E - 69 (Fibonacci Fan)
    **** W - 87 (Textboxes)
    **** S - 83 (GoldenRatioHorizontal) - UPDATED 2020-10-23 for 100% line
    **** I - 73 (GoldenRatioVertical) - UPDATED 2020-10-23 for 100% line
    **** B - 66 (Rectangle)
    **** L - 76 (Price Expansion generator - Wyckoff Range)
    **** O - 79 (PinchFork generator - No middle Lines - NEW 2019-02-18)
    **** R - 82 (Channel generator - No middle Lines - NEW 2019-02-18)
    **** 25 letters used up ****
    **** 1 - 49 (T Theory)
    **** 2 - 50 (T Theory, with 50% dividers)
    **** 3 - 51 (Time Expansion generator)
    **** 4 - 52 (Gann Fann - Retracement)
    **** 5 - 53 (Gann Fann - Retracement Mirror)
    **** 6 - 54 (Cycle Generator - Color1, uses letter Y for a single cycle)
    **** 7 - 55 (Cycle Generator - Color2, uses letter Y for a single cycle)
    **** 8 - 56 (Cycle Generator - Color3, uses letter Y for a single cycle)
    **************************************************************************************************************/
    



/******************************************************
******** Common Functions ********
******************************************************/

var SpecKey = {
    KEY1: 89     
};

var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser;
var DrawingOperation = {
    DrawInside: 434,
    DrawOutside: 435
};

function Point(xVal, yVal) {
    this.X = xVal;
    this.Y = yVal;
}

function ImageObject(widthVal, heightVal, leftVal, topVal) {
    this.ImgWidth = widthVal;
    this.ImgHeight = heightVal;
    this.ImgLeft = leftVal;
    this.ImgTop = topVal;
}

function getLineBySlope(startingPt, slope, imgWid, imgHt, col) {
    var tempHtml = "";
    var x1, x2, y1, y2;
    var maxLengthImg = Math.sqrt(Math.pow(imgWid, 2) + Math.pow(imgHt, 2));

    i = 0;
    while (true) {
        if (Math.abs(slope) <= 1) {
            x1 = startingPt.X;
            x2 = startingPt.X + i;
            y1 = startingPt.Y;
            y2 = y1 + ((x2 - x1) * slope);
        }
        else if (slope < -1) {
            y1 = startingPt.Y;
            y2 = startingPt.Y - i;
            x1 = startingPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }
        else if (slope > 1) {
            y1 = startingPt.Y;
            y2 = startingPt.Y + i;
            x1 = startingPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }

        if ((x2 > 0 && x2 < imgWid) && (y2 > 0 && y2 < imgHt)) {
            tempHtml += "<div class='CHG_pe' style='left: " + x2 + "px; top: " + y2 + "px; background-color:" + col + "'></div>";
        }

        i++;
        if (i > maxLengthImg) {
            break;
        }

        if ((slope < 0) && ((x2 > imgWid) || (y2 < 0))) {
            break;
        }
        if ((slope > 0) && ((x2 > imgWid) || (y2 > imgHt))) {
            break;
        }
    }

    return tempHtml;
}

function getLineBySlope_2(startingPt, slope, imgWid, imgHt, cssCls, descText) {
    var tempHtml = "";
    var x1, x2, y1, y2;
    var maxLengthImg = Math.sqrt(Math.pow(imgWid, 2) + Math.pow(imgHt, 2));
    var descTextTrigger = 0;

    i = 0;
    while (true) {
        if (Math.abs(slope) <= 1) {
            x1 = startingPt.X;
            x2 = startingPt.X + i;
            y1 = startingPt.Y;
            y2 = y1 + ((x2 - x1) * slope);
        }
        else if (slope < -1) {
            y1 = startingPt.Y;
            y2 = startingPt.Y - i;
            x1 = startingPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }
        else if (slope > 1) {
            y1 = startingPt.Y;
            y2 = startingPt.Y + i;
            x1 = startingPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }

        if ((x2 > 0 && x2 < imgWid) && (y2 > 0 && y2 < imgHt)) 
        {
            if ( (descTextTrigger == 0)  && i >= 300 ) 
            {
            descTextTrigger = 1;
            tempHtml += "<div class='CHG_pe " + cssCls + "' style='left: " + x2 + "px; top: " + y2 + "px;'>" + descText +"</div>";
            }
    
            else
            tempHtml += "<div class='CHG_pe " + cssCls + "' style='left: " + x2 + "px; top: " + y2 + "px;'></div>";
        }

        i++;
        if (i > maxLengthImg) {
            break;
        }

        if ((slope < 0) && ((x2 > imgWid) || (y2 < 0))) {
            break;
        }
        if ((slope > 0) && ((x2 > imgWid) || (y2 > imgHt))) {
            break;
        }
    }

    return tempHtml;
}
// Maxim B was changed this functon. 

//------------{
function getHtmlForPointToPointLine(lhsPt, rhsPt, imgWid, imgHt, lineType, cssCls, pointColor) {
    var tempHtml = "";
    var x1, x2, y1, y2;
    var colCssStr = "";
    dy = rhsPt.Y - lhsPt.Y;
    dx = rhsPt.X - lhsPt.X;
    slope = dy / dx;

    if (pointColor !== '') {
        colCssStr = "background-color:" + pointColor + ";";
    }

    var maxLengthImg = Math.sqrt(Math.pow(imgWid, 2) + Math.pow(imgHt, 2));
    if (dy === 0) {
        if (lineType === TrendLineType.ConnectedLine) {
            tempHtml += "<div class='" + cssCls + "' style='left: " + lhsPt.X + "px; top: " + lhsPt.Y + "px; width: " + (rhsPt.X - lhsPt.X) + "px;" + colCssStr + "'></div>";
        }
        else {
            tempHtml += "<div class='" + cssCls + "' style='left: " + lhsPt.X + "px; top: " + lhsPt.Y + "px; width: " + (imgWid - lhsPt.X) + "px;" + colCssStr + "'></div>";
        }
        return tempHtml;
    }

    if (dx === 0) {
        if (lineType === TrendLineType.ConnectedLine) {
            tempHtml += "<div class='" + cssCls + "' style='left: " + lhsPt.X + "px; top: " + lhsPt.Y + "px; width: " + (rhsPt.Y - lhsPt.X) + "px;" + colCssStr + "'></div>";
        }
        else {
            tempHtml += "<div class='" + cssCls + "' style='left: " + lhsPt.X + "px; top: " + lhsPt.Y + "px; height: " + (imgHt - lhsPt.Y) + "px;" + colCssStr + "'></div>";
        }
        return tempHtml;
    }


    i = 0;
    var xCor = lhsPt.X, yCor = lhsPt.Y;
    while (true) {
        if (Math.abs(slope) <= 1) {
            x1 = lhsPt.X;
            x2 = lhsPt.X + i;
            y1 = lhsPt.Y;
            y2 = y1 + ((x2 - x1) * slope);
        }
        else if (slope < -1) {
            y1 = lhsPt.Y;
            y2 = lhsPt.Y - i;
            x1 = lhsPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }
        else if (slope > 1) {
            y1 = lhsPt.Y;
            y2 = lhsPt.Y + i;
            x1 = lhsPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }

        if (lineType === TrendLineType.ConnectedLine) {
            if ((slope < 0) && ((x2 > rhsPt.X) || (y2 < 0))) {
                break;
            }
            if ((slope > 0) && ((x2 > rhsPt.X) || (y2 > rhsPt.Y))) {
                break;
            }
        }

        if (i > maxLengthImg) break;
        if ((slope < 0) && ((x2 > imgWid) || (y2 < 0))) break;
        if ((slope > 0) && ((x2 > imgWid) || (y2 > imgHt))) break;

        tempHtml += "<div class='" + cssCls + "' style='left: " + x2 + "px; top: " + y2 + "px;" + colCssStr + "'></div>";

        // calc the angle of slope line
        if (Math.abs(x2 - xCor) > 6) {
            //           tempHtml += "<div class='TG_pt3' style='left: " + (x2-1.5) + "px; top: " + (y1-1.5) + "px;" + "'></div>";
            xCor = x2;
        }

        if (Math.abs(y2 - yCor) > 6) {
            //           tempHtml += "<div class='TG_pt4' style='left: " + (x1-1.5) + "px; top: " + (y2-1.5) + "px;" + "'></div>";
            yCor = y2;
        }
        i++;
    }

    // ADD DEGREES TO RAY LINE
    var txtPlaceX = (x2 + lhsPt.X) / 2;
    var txtPlaceY = (y2 + lhsPt.Y) / 2;
    var radian = Math.atan(slope);
    var dec = Math.round(Math.pow(10, 4));
    var angleY = Math.round((90 + 180 * radian / Math.PI) * dec) / dec;
    var angleX = Math.round((-180 * radian / Math.PI) * dec) / dec;

    if (angleX < 0) {
        angleY = Math.round((-90 - angleX) * dec) / dec;
    }

    if (lineType === TrendLineType.RayLineDegrees) {
        txtPlaceY += 10; txtPlaceX += 10;
        // Add text to Canvas.
         if (angleX < 0) {
             tempHtml += "<div class='TG_pe' style='width:200px; height: 0px; left:" + txtPlaceX + "px; top:" + txtPlaceY + "px;' > <b><font color='#800080'>V: " + angleY + "°, H: " + angleX + "°</font></b></div>";
         }
         else{
              tempHtml += "<div class='TG_pe' style='width:200px; height: 0px; left:" + txtPlaceX + "px; top:" + txtPlaceY + "px;' > <b><font color='#006400'>V: " + angleY + "°, H: " + angleX + "°</font></b></div>";
         };
    }

    return tempHtml;
}

//---------------}

function drawCanvasPoint(canvasDiv, point, cssCls, ptOffset) {
    var pointObj = $("<div class=\"" + cssCls + "\"></div>");
    pointObj.css({
        'left': (point.X - ptOffset) + 'px',
        'top': (point.Y - ptOffset) + 'px'
    });
    canvasDiv.append(pointObj);

    return pointObj;
}

function getHorizontalLineForPoint1(startingPt, imgWidth, cssCls, descText) {
    var tempHtml = "";

    tempHtml += "<div class='PEG_pe " + cssCls + "' style='left: " + startingPt.X + "px; top: " + startingPt.Y + "px; width: " + (imgWidth - startingPt.X) + "px;'>"  + descText + "</div>";

    return tempHtml;
}

function getHorizontalLineForPoint2(startingPt, LineWidth, imgWidth, cssCls, descText) {
    var tempHtml = "";
    
    if ((startingPt.X + LineWidth) > imgWidth){
        LineWidth =  LineWidth - (((startingPt.X + LineWidth) - imgWidth) - 1);
    }

    tempHtml += "<div class='" + cssCls + "' style='left: " + startingPt.X + "px; top: " + startingPt.Y + "px; width: " + LineWidth + "px;'>"  + descText + "</div>";

    return tempHtml;
}


function getVerticalLineForPoint1(startingPt, imgHeight, cssCls) {
    var tempHtml = "";

    tempHtml += "<div class='PEG_pe " + cssCls + "' style='left: " + startingPt.X + "px; top: " + startingPt.Y + "px; height: " + (imgHeight - startingPt.Y) + "px;'></div>";

    return tempHtml;
}

function getVerticalLineForPoint2(startingPt, LineHeight, imgHeight, cssCls, descText) {
    var tempHtml = "";
    
    if ((startingPt.Y + LineHeight) > imgHeight){
        LineHeight =  LineHeight - (((startingPt.Y + LineHeight) - imgHeight) - 1);
    }

    tempHtml += "<div class='" + cssCls + "' style='left: " + startingPt.X + "px; top: " + startingPt.Y + "px; height: " + LineHeight + "px;'>" + descText+ "</div>";

    return tempHtml;
}

function checkBrowser() {
    var brMsg = "Sorry the drawing tool works best in Firefox, Chrome, Opera and IE8+ thanks !";
    if (!($.browser.msie)) {
        return true;
    }
    else {
        brVer = parseInt($.browser.version, 10);
        if (brVer <= 7) {
            alert(brMsg);
            return false;
        }
    }
    return true;
}

/******************************************************
******** Angle Generator ********
******************************************************/

var AG_LineType = {
    POSITIVE: 791,
    NEGETIVE: 792
};

$.fn.makeAngles = function(config) {
    var AG_isPositiveMaskKeyDown = false;
    var AG_isNegetiveMaskKeyDown = false;
    var AG_isAngleSpecialKeyDown = false;
    var imgWidth = 0;
    var imgHeight = 0;
    var imgTop = 0;
    var imgLeft = 0;
    

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.positiveMaskKeyCode:
                AG_isPositiveMaskKeyDown = true;
                break;
            case config.negetiveMaskKeyCode:
                AG_isNegetiveMaskKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                AG_isAngleSpecialKeyDown = true;
                //alert(AG_isAngleSpecialKeyDown);
                break;
            default:
                break;
        }
    });


    
    
    

    $(document).keyup(function(evt) {
        resetKeyMaskVals();
    });

    function resetKeyMaskVals() {
        AG_isPositiveMaskKeyDown = false;
        AG_isNegetiveMaskKeyDown = false;
        AG_isAngleSpecialKeyDown = false;
    }

    $(this).dblclick(function(evt) {
        $(this).children("div.AGcanvas").remove();
    });

    $(this).click(function(evt) {
        var imgObj, degrees;

        if (!AG_isPositiveMaskKeyDown && !AG_isNegetiveMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            resetKeyMaskVals();
            return;
        }


        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();

        AGcanvasDiv = $("<div class=\"AGcanvas\"></div>");
        AGcanvasDiv.css({
            'left': imgLeft + 'px',
            'top': imgTop + 'px'
        });
        $(this).append(AGcanvasDiv);

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        degrees = config.lineDegrees1;
        if(AG_isAngleSpecialKeyDown){
                degrees = config.lineDegrees2;
        }


        if (AG_isPositiveMaskKeyDown) {
            lineHtml = '';
            for (i = 0; i < degrees.length; i++) {
                if(!AG_isAngleSpecialKeyDown){
                    lineHtml += getHtmlForLine(AG_LineType.POSITIVE, currentX, currentY, degrees[i], imgWidth, imgHeight, 'AG_pe' + i);
                }else{
                    lineHtml += getHtmlForLine(AG_LineType.POSITIVE, currentX, currentY, degrees[i], imgWidth, imgHeight, 'AG_pe11');
                }
                
            }
            AGcanvasDiv.append(lineHtml);
        }
        else if (AG_isNegetiveMaskKeyDown) {
            lineHtml = '';
            for (i = 0; i < degrees.length; i++) {
                if(!AG_isAngleSpecialKeyDown){
                    lineHtml += getHtmlForLine(AG_LineType.NEGETIVE, currentX, currentY, degrees[i], imgWidth, 0, 'AG_pe' + i);
                }else{
                    lineHtml += getHtmlForLine(AG_LineType.NEGETIVE, currentX, currentY, degrees[i], imgWidth, 0, 'AG_pe11');
                }
            }
            AGcanvasDiv.append(lineHtml);
        }

        resetKeyMaskVals();
    });

    return $(this);
};

function getHtmlForLine(type, x1, y1, deg, uBoundX, uBoundY, cssClass) {
    var htmlVal = "";
    var sinVal = 0;
    var cosVal = 0;

    if (type == AG_LineType.POSITIVE) {
        sinVal = Math.sin(Math.PI * deg / 180);
        cosVal = Math.cos(Math.PI * deg / 180);
    }
    else if (type == AG_LineType.NEGETIVE) {
        sinVal = Math.sin(Math.PI * -deg / 180);
        cosVal = Math.cos(Math.PI * -deg / 180);
    }

    var len = uBoundX - x1;
    var i = 0;
    var xVal = 0;
    var yVal = 0;
    var classOnLabel = '';
    var ptCssClass = '';

    while (true) {
        if ((i % 2) !== 0 && deg !== 45) {
            i++;
            continue;
        }
        xVal = (i * cosVal) + x1;
        yVal = (i * sinVal) + y1;

        if (type == AG_LineType.POSITIVE) {
            if (yVal >= uBoundY) {
                classOnLabel = 'AG_fY';
                break;
            }
            else if (xVal >= uBoundX) {
                classOnLabel = 'AG_fX';
                break;
            }
        }
        else if (type == AG_LineType.NEGETIVE) {

            if (yVal <= uBoundY) {
                classOnLabel = 'AG_fY';
                break;
            }
            else if (xVal >= uBoundX) {
                classOnLabel = 'AG_fX';
                break;
            }
        }

        ptCssClass = 'AG_pe';
        if (deg < 45) {
            ptCssClass += ' AG_pe_H';
        }
        else {
            ptCssClass += ' AG_pe_V';
        }


        htmlVal += "<div class='" + ptCssClass + " " + cssClass + "' style='left: " + xVal + "px; top: " + yVal + "px;'></div>";
        i++;
    }
    return htmlVal;
}

/******************************************************
******** Cycle Generator ********
******************************************************/

$.fn.makeCycles = function(config) {
    var CG_isCycleGenMaskKeyDown1 = false;
    var CG_isCycleGenMaskKeyDown2 = false;
    var CG_isCycleGenMaskKeyDown3 = false;
    var CG_isCycleSpecialKeyDown = false;
    var CG_isFirstPointDrawn = false;
    var CG_isSecondPointDrawn = false;
    var CG_firstPtLeft = 0;
    var CG_secondPtLeft = 0;
    var nlineColor = "#000000";
    

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.cycleGenMaskKeyCode1:
                CG_isCycleGenMaskKeyDown1 = true;
                nlineColor = config.lineColor1;
                break;
            case config.cycleGenMaskKeyCode2:
                CG_isCycleGenMaskKeyDown2 = true;
                nlineColor = config.lineColor2;
                break;
            case config.cycleGenMaskKeyCode3:
                CG_isCycleGenMaskKeyDown3 = true;
                nlineColor = config.lineColor3;
                break;
            default:
                break;
        }
    });
    
   $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                CG_isCycleSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });
    
   function resetMaskKeys_CG() {
        CG_isCycleGenMaskKeyDown1 = false;
        CG_isCycleGenMaskKeyDown2 = false;
        CG_isCycleGenMaskKeyDown3 = false;
        CG_isCycleSpecialKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetMaskKeys_CG();
    });


    $(this).dblclick(function(evt) {
        $(this).children("div.CGcanvas").remove();
    });


    var CGcanvasDiv;
    var CGcanvasDivTemp;
    var CGcanvasDiv_parentImg;
    var firstPt, secondPt, lhsPoint, rhsPoint;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lhsPtLeft, rhsPtLeft, lineHtml;
        var ptOffset = 2;

        if (!CG_isCycleGenMaskKeyDown1 && !CG_isCycleGenMaskKeyDown2 && !CG_isCycleGenMaskKeyDown3) {
            return;
        }
        
        if (!checkBrowser()) {
            resetMaskKeys_CG();
            return;
        }

        if (!CG_isFirstPointDrawn || CG_isSecondPointDrawn) {
            CG_isFirstPointDrawn = false;
            CG_isSecondPointDrawn = false;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        CGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);//IANS
        
        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;
        
        if (currentX > CGcanvasDiv_parentImg.imgWidth || currentY > CGcanvasDiv_parentImg.imgHeight) {
            return;
        }

        if (CG_isFirstPointDrawn) {
            /* Get the old canvas as it was created while first point creation */
            CGcanvasDiv = CGcanvasDivTemp;
        }
        else {
            /* No points have been drawn so far. Create the canvas */
            CGcanvasDiv = $("<div class=\"CGcanvas\"></div>");
            CGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(CGcanvasDiv);
            CGcanvasDivTemp = CGcanvasDiv;
        }
        
        
        
        

        if (CG_isFirstPointDrawn) {
            ptCssClass = 'CG_pt2';
            CG_secondPtLeft = currentX;
            secondPt = new Point(currentX, currentY);
            if (CG_secondPtLeft == CG_firstPtLeft) {
                return;
            }
            CG_isSecondPointDrawn = true;
        }
        else {
            ptCssClass = 'CG_pt1';
            CG_firstPtLeft = currentX;
            firstPt = new Point(currentX, currentY);
            CG_isFirstPointDrawn = true;
        }

        CG_Pt = $("<div class=\"" + ptCssClass + "\"></div>");
        CG_Pt.css({
            'left': (currentX - ptOffset) + 'px',
            'top': (currentY - ptOffset) + 'px'
        });
        CGcanvasDiv.append(CG_Pt);
        
    
        if (CG_isFirstPointDrawn && CG_isSecondPointDrawn) {
            if (firstPt.X > secondPt.X) {
                lhsPoint = secondPt;
                rhsPoint = firstPt;
            }
            else {
                lhsPoint = firstPt;
                rhsPoint = secondPt;
               
            }
            lineHtml = "";
            lineGap = Math.abs(CG_firstPtLeft - CG_secondPtLeft);
            lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.ConnectedLine, 'CG_pe', nlineColor);
             
            //Draw Vertical Lines
            //lhsPtLeft = Math.min(CG_firstPtLeft, CG_secondPtLeft);
            //rhsPtLeft = Math.max(CG_firstPtLeft, CG_secondPtLeft);
            //lineHtml += getHtmlLineOnLeft(lhsPtLeft, imgTop, imgHeight, lineGap, config.lineColor);
            //lineHtml += getHtmlLineOnRight(rhsPtLeft, imgTop, imgWidth, imgHeight, lineGap, config.lineColor);

            
            //Draw Arcs
            var xDiff = (firstPt.X - secondPt.X)/2;
            var radius = Math.sqrt(Math.pow(xDiff, 2)); 
            var StartPointX = (lhsPoint.X + rhsPoint.X)/2 ;
            var StartPointY = Math.min(imgHeight,350); //0;
            var StartPoint = new Point(StartPointX, StartPointY);     
            lineHtml += getCycleArcHtmlForRadius(StartPoint, radius, 0, -180, 0, CGcanvasDiv_parentImg, nlineColor);
            
            if(!CG_isCycleSpecialKeyDown){
                lineHtml += getHtmlArcOnLeft(StartPoint, radius, lineGap, -180, 0, CGcanvasDiv_parentImg, nlineColor);
                lineHtml += getHtmlArcOnRight(StartPoint, radius, lineGap, imgWidth, -180, 0, CGcanvasDiv_parentImg, nlineColor);
            }
        

            CGcanvasDiv.append(lineHtml);
            CG_isFirstPointDrawn = false;
            CG_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getCycleArcHtmlForRadius(fstPt, radius1, lineGapVal, startAngle, endAngle, parentImg, lineColor) {
    var incrementVal = 0;
    var tempHtml1 = "";

    if (radius1 <= 50) {
        incrementVal += 1;
    }
    else if (radius1 <= 100) {
        incrementVal += 0.6;
    }
    else if (radius1 <= 150) {
        incrementVal += 0.4;
    }
    else if (radius1 <= 320) {
        incrementVal += 0.2;
    }
    else {
        incrementVal += 0.1;
    }

    

    for (i = startAngle; i < endAngle; i += incrementVal) {
        sinVal = Math.sin(Math.PI * i / 180);
        cosVal = Math.cos(Math.PI * i / 180);

        xVal = (fstPt.X + lineGapVal) + (radius1 * cosVal);
        yVal = fstPt.Y + (radius1 * sinVal);//BOTTOM UP
        //yVal = fstPt.Y - (radius1 * sinVal);//TOP DOWN
        if ((xVal > 0) && (xVal < parentImg.ImgWidth) && (yVal > 0) && (yVal < parentImg.ImgHeight)) {
            tempHtml1 += "<div class='CG_pe' style='left: " + xVal + "px; top: " + yVal + "px;background-color:" + lineColor + ";'></div>";
        }
    }

    return tempHtml1;
}


function getHtmlLineOnLeft(leftVal, topVal, heightVal, lineGapVal, lineColor) {
    var tempHtml = "";
    var tempLeftVal = leftVal;

    while (tempLeftVal >= 0) {
        tempHtml += "<div class='CG_VLine' style='background-color:" + lineColor + ";left:" + tempLeftVal + "px; height: " + heightVal + "px'></div>";
        tempLeftVal -= lineGapVal;
    }

    return tempHtml;
}



function getHtmlLineOnRight(leftVal, topVal, widthVal, heightVal, lineGapVal, lineColor) {
    var tempHtml = "";
    var tempLeftVal = leftVal;

    while (tempLeftVal <= widthVal) {
        tempHtml += "<div class='CG_VLine' style='background-color:" + lineColor + ";left:" + tempLeftVal + "px; height: " + heightVal + "px'></div>";
        tempLeftVal += lineGapVal;
    }

    return tempHtml;
}

function getHtmlArcOnRight(fstPt, radius1, lineGap, widthVal, startAngle, endAngle, parentImg, lineColor) {
    var tempHtml = "";
    var lineGapVal = lineGap;
    var n = 0;

    while (lineGapVal <= widthVal) {
        tempHtml += getCycleArcHtmlForRadius(fstPt, radius1, lineGapVal, startAngle, endAngle, parentImg, lineColor);
        lineGapVal += lineGap;
    }

    return tempHtml;
}

function getHtmlArcOnLeft(fstPt, radius1, lineGap, startAngle, endAngle, parentImg, lineColor) {
    var tempHtml = "";
    var lineGapVal = -lineGap;
    var leftWidth = fstPt.X
    var n = 0;

    while (leftWidth > 0 ) {
        tempHtml += getCycleArcHtmlForRadius(fstPt, radius1, lineGapVal, startAngle, endAngle, parentImg, lineColor);
        lineGapVal -= lineGap;
        leftWidth -=lineGap;
    }

    return tempHtml;
}

/******************************************************
******** Trendline Generator ********
******************************************************/



//Maxim B changed this
//-------{
var TrendLineType = {
    RayLineDegrees: 219,//IANS added 2021-04-12
    RayLine: 220,
    ConnectedLine: 221,
    FullRyaLine: 222       
};
//----------}

$.fn.makeTrendLines = function(config) {
    var TG_isTrendlineGenMaskKeyDown = false;
    var TG_isConnectedTrendlineGenMaskKeyDown = false;
    var TG_isTrendlineFullGenMaskKeyDown = false;
    var TG_isRetraceSpecialKeyDown = false;
    var TG_isFirstPointDrawn = false;
    var TG_isSecondPointDrawn = false;
    var TG_firstPoint = null;
    var TG_secondPoint = null;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.trendLineGenMaskKeyCode:
                TG_isTrendlineGenMaskKeyDown = true;
                break;
            case config.connectedTrendLineGenMaskKeyCode:
                TG_isConnectedTrendlineGenMaskKeyDown = true;
                break;
            case config.fullTrendLineGenMaskKeyCode:
                TG_isTrendlineFullGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });


    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                TG_isRetraceSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });


    function resetTrendLineMaskKeys() {
        TG_isTrendlineGenMaskKeyDown = false;
        TG_isConnectedTrendlineGenMaskKeyDown = false;
        TG_isTrendlineFullGenMaskKeyDown = false;
        TG_isRetraceSpecialKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetTrendLineMaskKeys();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.TGcanvas").remove();
    });

    var TGcanvasDivTemp;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lhsPoint, rhsPoint, lineHtml;
        var TGcanvasDiv;
        var ptOffset = 2;

        if (!TG_isTrendlineGenMaskKeyDown && !TG_isConnectedTrendlineGenMaskKeyDown && !TG_isTrendlineFullGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            resetTrendLineMaskKeys();
            return;
        }

        if (!TG_isFirstPointDrawn || TG_isSecondPointDrawn) {
            TG_isFirstPointDrawn = false;
            TG_isSecondPointDrawn = false;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;
        if (currentX > imgWidth || currentY > imgHeight) {
            return;
        }

        if (!TG_isFirstPointDrawn && !TG_isSecondPointDrawn) {
            TGcanvasDiv = $("<div class=\"TGcanvas\"></div>");
            TGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(TGcanvasDiv);
            TGcanvasDivTemp = TGcanvasDiv;
        }

        if (TG_isFirstPointDrawn) {
            /* Get the old canvas as it was created while first point creation */
            TGcanvasDiv = TGcanvasDivTemp;

            ptCssClass = 'TG_pt2';
            TG_secondPoint = new Point(currentX, currentY);
            TG_isSecondPointDrawn = true;
        }
        else {
            ptCssClass = 'TG_pt1';
            TG_firstPoint = new Point(currentX, currentY);
            TG_isFirstPointDrawn = true;
        }

        TG_Pt = $("<div class=\"" + ptCssClass + "\"></div>");
        TG_Pt.css({
            'left': (currentX - ptOffset) + 'px',
            'top': (currentY - ptOffset) + 'px'
        });
        TGcanvasDiv.append(TG_Pt);

        if (TG_isFirstPointDrawn && TG_isSecondPointDrawn) {
            if (TG_firstPoint.X > TG_secondPoint.X) {
                lhsPoint = TG_secondPoint;
                rhsPoint = TG_firstPoint;
            }
            else {
                lhsPoint = TG_firstPoint;
                rhsPoint = TG_secondPoint;
            }

            lineHtml = "";

            if (TG_isTrendlineFullGenMaskKeyDown) {
                lineHtml += getHtmlForLHSLine(lhsPoint, rhsPoint, imgWidth, imgHeight, config.lineColor);
            }

            //Maxim B chaged this. splite T key function with G,F key
            //-------------{            
            if (TG_isTrendlineGenMaskKeyDown && TG_isRetraceSpecialKeyDown) {
                lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.RayLineDegrees, 'TG_pe', '');
            }
            
            if (TG_isTrendlineGenMaskKeyDown && !TG_isRetraceSpecialKeyDown) {
                lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.RayLine, 'TG_pe', '');
            }
            
            if (TG_isTrendlineFullGenMaskKeyDown) {
                lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.FullRyaLine, 'TG_pe', '');
            }

            if (TG_isConnectedTrendlineGenMaskKeyDown) {
                lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.ConnectedLine, 'TG_pe', '');
            }

            lines = $(lineHtml);
 
            TGcanvasDiv.append(lines);
//--------------}

            $("div.TG_pe").css({ 'background-color': config.lineColor });
            TG_isFirstPointDrawn = false;
            TG_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getHtmlForLHSLine(lhsPt, rhsPt, imgWid, imgHt, col) {
    var tempHtml = "";
    var x1, x2, y1, y2;
    dy = rhsPt.Y - lhsPt.Y;
    dx = rhsPt.X - lhsPt.X;
    slope = dy / dx;

    var maxLengthImg = Math.sqrt(Math.pow(imgWid, 2) + Math.pow(imgHt, 2));

    if (dy === 0) {
        tempHtml += "<div class='TG_pe' style='left:0px; top: " + lhsPt.Y + "px; width: " + lhsPt.X + "px'></div>";
        return tempHtml;
    }

    if (dx === 0) {
        tempHtml += "<div class='TG_pe' style='top:0px; left: " + lhsPt.X + "px; height: " + lhsPt.Y + "px'></div>";
        return tempHtml;
    }

    i = 0;
    while (true) {
        if (Math.abs(slope) <= 1) {
            x1 = lhsPt.X;
            x2 = lhsPt.X - i;
            y1 = lhsPt.Y;
            y2 = y1 + ((x2 - x1) * slope);
        }
        else if (slope < -1) {
            y1 = lhsPt.Y;
            y2 = lhsPt.Y + i;
            x1 = lhsPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }
        else if (slope > 1) {
            y1 = lhsPt.Y;
            y2 = lhsPt.Y - i;
            x1 = lhsPt.X;
            x2 = x1 + ((y2 - y1) / slope);
        }

        if (i > maxLengthImg) {
            break;
        }
        if ((slope < 0) && ((x2 < 0) || (y2 > imgHt))) {
            break;
        }
        if ((slope > 0) && ((x2 < 0) || (y2 < 0))) {
            break;
        }

        tempHtml += "<div class='TG_pe' style='left: " + x2 + "px; top: " + y2 + "px;'></div>";

        i++;
    }

    return tempHtml;
}

/******************************************************
******** Retracement Generator ********
******************************************************/

$.fn.makeRetracement = function(config) {
    var RG_isRetraceGenMaskKeyDown = false;
    var RG_isRetraceSpecialKeyDown = false;
    var RG_isFirstPointDrawn = false;
    var RG_isSecondPointDrawn = false;
    var RG_firstPoint;
    var RG_secondPoint;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.retraceGenMaskKeyCode:
                RG_isRetraceGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                RG_isRetraceSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        RG_isRetraceGenMaskKeyDown = false;
        RG_isRetraceSpecialKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.RGcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lineHtml, Percentages;
        var RGcanvasDiv;
        var RGcanvasDiv_parentImg;
        var ptOffset = 2;
        var lhsPoint, rhsPoint;
        var pointOffset = 2;

        if (!RG_isRetraceGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            RG_isRetraceGenMaskKeyDown = false;
            RG_isRetraceSpecialKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        RGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        RGcanvasDiv = $(this).children("div.RGcanvas");
        if (!RGcanvasDiv.attr("class")) {
            RGcanvasDiv = $("<div class=\"RGcanvas\"></div>");
            RGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(RGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > RGcanvasDiv_parentImg.ImgWidth || currentY > RGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!RG_isFirstPointDrawn) {
            RG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(RGcanvasDiv, RG_firstPoint, 'RG_pt1', pointOffset);
            RG_isFirstPointDrawn = true;
            return;
        }

        if (!RG_isSecondPointDrawn) {
            if (currentX < RG_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                RG_isFirstPointDrawn = false;
                return;
            }
            RG_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(RGcanvasDiv, RG_secondPoint, 'RG_pt2', pointOffset);
            RG_isSecondPointDrawn = true;
        }

        if (RG_isFirstPointDrawn && RG_isSecondPointDrawn) {
            lineHtml = "";
            lineGap = Math.abs(RG_firstPoint.Y - RG_secondPoint.Y);
            Percentages = config.retracementPercentage1;
            if(RG_isRetraceSpecialKeyDown){
                Percentages = config.retracementPercentage2;
            }
            
            lineHtml += getHtmlLineRetracement(RG_secondPoint.X, RG_firstPoint.Y, RG_secondPoint.Y, RGcanvasDiv_parentImg.ImgWidth, RGcanvasDiv_parentImg.ImgHeight, lineGap, Percentages);

            if (RG_firstPoint.X > RG_secondPoint.X) {
                lhsPoint = RG_secondPoint;
                rhsPoint = RG_firstPoint;
            }
            else {
                lhsPoint = RG_firstPoint;
                rhsPoint = RG_secondPoint;
            }

            lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.ConnectedLine, 'RG_pe', config.colorBetweenPoints);


            RGcanvasDiv.append(lineHtml);

            RG_isFirstPointDrawn = false;
            RG_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getHtmlLineRetracement(fstLeft, fstPtTop, sndPtTop, widthVal, heightVal, lineGapVal, retracePer) {
    var tempHtml = "";

    if (fstPtTop == sndPtTop) {
        tempHtml += "<div class='RG_HLine RG_pe0' style='left: 0px; top:" + fstPtTop + "px; width: " + widthVal + "px'></div>";
    }
    for (cnt = 0; cnt < retracePer.length; cnt++) {
        var nxtTopVal;
        if (retracePer[cnt] >= 0) {
            var tempRatio = Math.floor(retracePer[cnt] * 1000)/10;
            
            if (fstPtTop < sndPtTop) {
                nxtTopVal = sndPtTop - (lineGapVal * retracePer[cnt]);
                if (nxtTopVal > heightVal) {
                    break;
                }
                tempHtml += "<div class='RG_HLine RG_pe" + cnt + "' style='left: " + fstLeft + "px; top:" + nxtTopVal + "px; width: " + (widthVal - fstLeft) + "px'><div style = 'font-family:arial;position:relative;right:40px;color:red;'>" + tempRatio +"%</div></div>";
            }
            else if (fstPtTop > sndPtTop) {
                nxtTopVal = sndPtTop + (lineGapVal * retracePer[cnt]);
                if (nxtTopVal < 0) {
                    break;
                }
                tempHtml += "<div class='RG_HLine RG_pe" + cnt + "' style='left: " + fstLeft + "px; top:" + nxtTopVal + "px; width: " + (widthVal - fstLeft) + "px'><div style = 'font-family:arial;position:relative;right:40px;color:blue;'>" + tempRatio +"%</div></div>";
            }
        }
    }

    return tempHtml;
}

/******************************************************
******** Arrow generator ********
******************************************************/

$.fn.makeArrows = function(config) {
    var ARG_isArrowUpKeyDown = false;
    var ARG_isArrowDownKeyDown = false;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.downArrowMaskKey:
                ARG_isArrowDownKeyDown = true;
                break;
            case config.upArrowMaskKey:
                ARG_isArrowUpKeyDown = true;
                break;
            default:
                break;
        }
    });

    function resetArrowGenMaskKeys() {
        ARG_isArrowUpKeyDown = false;
        ARG_isArrowDownKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetArrowGenMaskKeys();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.ARGcanvas").remove();
    });

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lineHtml;
        var ARGcanvasDiv;
        var ARGarrowObj;
        var ptOffset = 2;

        if (!ARG_isArrowUpKeyDown && !ARG_isArrowDownKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            resetArrowGenMaskKeys();
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > imgWidth || currentY > imgHeight) {
            return;
        }

        if ($(this).children("div.ARGcanvas").attr("class") != "ARGcanvas") {
            ARGcanvasDiv = $("<div class=\"ARGcanvas\"></div>");
            ARGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(ARGcanvasDiv);
        }
        else {
            ARGcanvasDiv = $(this).children("div.ARGcanvas");
        }

        if (ARG_isArrowDownKeyDown) {
            ARGarrowObj = $("<img class='ARGImg' src='" + config.downArrowImgSrc + "' style='left: " + (currentX - 5) + "px; top: " + (currentY - 7) + "px' alt='' />");
        }
        else if (ARG_isArrowUpKeyDown) {
            ARGarrowObj = $("<img class='ARGImg' src='" + config.upArrowImgSrc + "' style='left: " + (currentX - 5) + "px; top: " + (currentY - 7) + "px' alt='' />");
        }

        ARGcanvasDiv.append(ARGarrowObj);
    });

    return $(this);
};

/******************************************************
******** Channel Generator ********
******************************************************/

$.fn.makeChannels = function(config) {
    var CHG_isChannelGenMaskKeyDown = false;
    var CHG_firstPoint = null;
    var CHG_secondPoint = null;
    var CHG_thirdPoint = null;
    var CHG_isFirstPointDrawn = false;
    var CHG_isSecondPointDrawn = false;
    var CHG_isThirdPointDrawn = false;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.channelGenMaskKeyCode:
                CHG_isChannelGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        CHG_isChannelGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        CHG_isFirstPointDrawn = false;
        CHG_isSecondPointDrawn = false;
        CHG_isThirdPointDrawn = false;
        $(this).children("div.CHGcanvas").remove();
    });

    var CHGcanvasDiv;
    var CHGcanvasDiv_parentImg;


    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!CHG_isChannelGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            CHG_isChannelGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        CHGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        CHGcanvasDiv = $(this).children("div.CHGcanvas");
        if (!CHGcanvasDiv.attr("class")) {
            CHGcanvasDiv = $("<div class=\"CHGcanvas\"></div>");
            CHGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(CHGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > CHGcanvasDiv_parentImg.ImgWidth || currentY > CHGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!CHG_isFirstPointDrawn && !CHG_isSecondPointDrawn && !CHG_isThirdPointDrawn) {
            CHG_firstPoint = new Point(currentX, currentY);
            drawChannelPoint(CHGcanvasDiv, CHG_firstPoint, 'CHG_pt1', pointOffset);
            CHG_isFirstPointDrawn = true;
        }
        else if (CHG_isFirstPointDrawn && !CHG_isSecondPointDrawn && !CHG_isThirdPointDrawn) {
            CHG_secondPoint = new Point(currentX, currentY);
            drawChannelPoint(CHGcanvasDiv, CHG_secondPoint, 'CHG_pt2', pointOffset);
            CHG_isSecondPointDrawn = true;
        }
        else if (CHG_isFirstPointDrawn && CHG_isSecondPointDrawn && !CHG_isThirdPointDrawn) {
            CHG_thirdPoint = new Point(currentX, currentY);
            drawChannelPoint(CHGcanvasDiv, CHG_thirdPoint, 'CHG_pt3', pointOffset);
            CHG_isThirdPointDrawn = true;
        }

        if (CHG_isFirstPointDrawn && CHG_isSecondPointDrawn && CHG_isThirdPointDrawn) {
            drawThisChannel(CHGcanvasDiv, CHGcanvasDiv_parentImg, CHG_firstPoint, CHG_secondPoint, CHG_thirdPoint, config.channelColor, config.divisionColor, config.colorBetweenPoints, config.channelGenMaskKeyCode);
            CHG_isFirstPointDrawn = false;
            CHG_isSecondPointDrawn = false;
            CHG_isThirdPointDrawn = false;
        }
    });

    return $(this);
};

function drawChannelPoint(canvasDiv, point, cssCls, ptOffset) {
    pointObj = $("<div class=\"" + cssCls + "\"></div>");
    pointObj.css({
        'left': (point.X - ptOffset) + 'px',
        'top': (point.Y - ptOffset) + 'px'
    });
    canvasDiv.append(pointObj);
}

function drawThisChannel(canvasDiv, parentImg, fstPt, sndPt, trdPt, channelCol, divisionCol, colBetnPoints, keyBoardNum) {
    var lhsPoint, rhsPoint;

    if (fstPt.X > sndPt.X) {
        lhsPoint = sndPt;
        rhsPoint = fstPt;
    }
    else {
        lhsPoint = fstPt;
        rhsPoint = sndPt;
    }

    dy = rhsPoint.Y - lhsPoint.Y;
    dx = rhsPoint.X - lhsPoint.X;
    slope = dy / dx;

    htmlVal = getLineBySlope(lhsPoint, slope, parentImg.ImgWidth, parentImg.ImgHeight, channelCol);
    htmlVal += getLineBySlope(trdPt, slope, parentImg.ImgWidth, parentImg.ImgHeight, channelCol);

   
    if (keyBoardNum == 67)
    {
        insideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawInside, 0.5);
        htmlVal += getLineBySlope(insideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);

        outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 0.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);

        outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 0.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
    }
    
    /* IANS ADD ON START 2019-05-11 */
    outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 1);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
    if (keyBoardNum == 67)
    {
        outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 1.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
    }

    outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 1);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
    if (keyBoardNum == 67)
    {
        outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 1.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
    }
    
    outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 2);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
    if (keyBoardNum == 67)
    {
        outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 2.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
    }

    outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 2);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
    if (keyBoardNum == 67)
    {
        outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 2.5);
        htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
    }
    
    
    
    
    /* BLUE OUT SIDE LINES */
    
    outsideOfFirst = getStartPtWithPerpChannelFactor(lhsPoint, trdPt, slope, DrawingOperation.DrawOutside, 3);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
    outsideOfFirst = getStartPtWithPerpChannelFactor(trdPt, fstPt, slope, DrawingOperation.DrawOutside, 3);
    htmlVal += getLineBySlope(outsideOfFirst, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#0026FF');
    
   /* IANS ADD ON END 2019-05-11 */


    htmlVal += getHtmlForPointToPointLine(lhsPoint, rhsPoint, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'CHG_pe', colBetnPoints);

    canvasDiv.append(htmlVal);
}

/* Returns a point with exactly half perpendicular distance
ADJUST BY IAN 2019-02-17 */
function getStartPtWithPerpChannelFactor(startPt, endPt, slopeVal, drawOpType, cFactor) {
    var cDiff = 0;
    var midCVal = 0;
    var xFinal, yFinal;

    /*************************
    *** applying y = mx + c;
    **************************/

    c1 = startPt.Y - (slopeVal * startPt.X);
    c2 = endPt.Y - (slopeVal * endPt.X);

    isToBeAdded = false;

    if (c1 > 0 && c2 > 0) {
        if (c1 < c2) {
            cDiff = c2 - c1;
        }
        else {
            cDiff = c1 - c2;
        }
    }
    else if (c1 < 0 && c2 < 0) {
        if (c1 < c2) {
            cDiff = c2 - c1;
        }
        else {
            cDiff = c1 - c2;
        }
    }
    else if ((c1 > 0 && c2 < 0) || (c1 < 0 && c2 > 0)) {
        cDiff = Math.abs(c1) + Math.abs(c2);
    }

    switch (drawOpType) {
        case DrawingOperation.DrawInside:
            {
                if (c1 < c2) {
                    isToBeAdded = true;
                }
                else {
                    isToBeAdded = false;
                }
            }
            break;
        case DrawingOperation.DrawOutside:
            {
                if (c1 < c2) {
                    isToBeAdded = false;
                }
                else {
                    isToBeAdded = true;
                }
            }
            break;
        default:
            break;
    }

    if (isToBeAdded) {
        midCVal = c1 + (cDiff * cFactor);
    }
    else {
        midCVal = c1 - (cDiff * cFactor);
    }

    xFinal = startPt.X;
    yFinal = (slopeVal * xFinal) + midCVal;

    return (new Point(xFinal, yFinal));
}





/******************************************************
******** PitchFork Generator ********
******************************************************/

$.fn.makePitchForks = function(config) {
    var PFG_isPinchForkGenMaskKeyDown = false;
    var PFG_firstPoint = null;
    var PFG_secondPoint = null;
    var PFG_thirdPoint = null;
    var PFG_isFirstPointDrawn = false;
    var PFG_isSecondPointDrawn = false;
    var PFG_isThirdPointDrawn = false;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.pinchForkGenMaskKeyCode:
                PFG_isPinchForkGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        PFG_isPinchForkGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        PFG_isFirstPointDrawn = false;
        PFG_isSecondPointDrawn = false;
        PFG_isThirdPointDrawn = false;
        $(this).children("div.PFGcanvas").remove();
    });

    var PFGcanvasDiv;
    var PFGcanvasDiv_parentImg;
    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!PFG_isPinchForkGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            PFG_isPinchForkGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        PFGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        PFGcanvasDiv = $(this).children("div.PFGcanvas");
        if (!PFGcanvasDiv.attr("class")) {
            PFGcanvasDiv = $("<div class=\"PFGcanvas\"></div>");
            PFGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(PFGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > PFGcanvasDiv_parentImg.ImgWidth || currentY > PFGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!PFG_isFirstPointDrawn && !PFG_isSecondPointDrawn && !PFG_isThirdPointDrawn) {
            PFG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(PFGcanvasDiv, PFG_firstPoint, 'PFG_pt1', pointOffset);
            PFG_isFirstPointDrawn = true;
        }
        else if (PFG_isFirstPointDrawn && !PFG_isSecondPointDrawn && !PFG_isThirdPointDrawn) {
            PFG_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(PFGcanvasDiv, PFG_secondPoint, 'PFG_pt2', pointOffset);
            PFG_isSecondPointDrawn = true;
        }
        else if (PFG_isFirstPointDrawn && PFG_isSecondPointDrawn && !PFG_isThirdPointDrawn) {
            PFG_thirdPoint = new Point(currentX, currentY);

            if ((PFG_thirdPoint.X < PFG_firstPoint.X) && (PFG_thirdPoint.X < PFG_secondPoint.X)) {
                drawCanvasPoint(PFGcanvasDiv, PFG_thirdPoint, 'PFG_pt3', pointOffset);
            }
            else {
                fstPtObj.remove();
                sndPtObj.remove();
                PFG_isPinchForkGenMaskKeyDown = false;
                PFG_isFirstPointDrawn = false;
                PFG_isSecondPointDrawn = false;
                PFG_isThirdPointDrawn = false;
                return;
            }
            PFG_isThirdPointDrawn = true;
        }

        if (PFG_isFirstPointDrawn && PFG_isSecondPointDrawn && PFG_isThirdPointDrawn) {
            drawThisPinchFork(PFGcanvasDiv, PFGcanvasDiv_parentImg, PFG_firstPoint, PFG_secondPoint, PFG_thirdPoint, config.lineColor, config.divisionColor, config.colorBetweenPoints, config.pinchForkGenMaskKeyCode);
            PFG_isFirstPointDrawn = false;
            PFG_isSecondPointDrawn = false;
            PFG_isThirdPointDrawn = false;
        }
    });

    return $(this);
};

function drawThisPinchFork(canvasDiv, parentImg, fstPt, sndPt, trdPt, lineColor, divisionCol, colBetnPoints, keyBoardNum) {
    var midPt = getMidPoint(fstPt, sndPt);
    var outsidePt1 = getOutsidePoint(fstPt, midPt, 1);
    var outsidePt2 = getOutsidePoint(sndPt, midPt ,1);
    
    /* IANS START  */
    var outsidePt3 = getOutsidePoint(fstPt, midPt, 2);
    var outsidePt4 = getOutsidePoint(sndPt, midPt, 2);
    var outsidePt5 = getOutsidePoint(fstPt, midPt, 3);
    var outsidePt6 = getOutsidePoint(sndPt, midPt, 3);
    var outsidePt7 = getOutsidePoint(fstPt, midPt, 4);
    var outsidePt8 = getOutsidePoint(sndPt, midPt, 4);
    var outsidePt9 = getOutsidePoint(fstPt, midPt, 5);
    var outsidePt10 = getOutsidePoint(sndPt, midPt, 5);
    
     /* IANS END  */
    
    var lhsPoint, rhsPoint;

    dy = midPt.Y - trdPt.Y;
    dx = midPt.X - trdPt.X;
    slope = dy / dx;

    htmlVal = getLineBySlope(fstPt, slope, parentImg.ImgWidth, parentImg.ImgHeight, lineColor);
    htmlVal += getLineBySlope(sndPt, slope, parentImg.ImgWidth, parentImg.ImgHeight, lineColor);
    htmlVal += getLineBySlope(trdPt, slope, parentImg.ImgWidth, parentImg.ImgHeight, lineColor);
    
    if (keyBoardNum == 80)
    {
        htmlVal += getLineBySlope(outsidePt1, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        htmlVal += getLineBySlope(outsidePt2, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        htmlVal += getLineBySlope(outsidePt5, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        htmlVal += getLineBySlope(outsidePt6, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        htmlVal += getLineBySlope(outsidePt9, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        htmlVal += getLineBySlope(outsidePt10, slope, parentImg.ImgWidth, parentImg.ImgHeight, divisionCol);
        
    }    
    
     /* IANS START  */
    htmlVal += getLineBySlope(outsidePt3, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#FF0000');
    htmlVal += getLineBySlope(outsidePt4, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#FF0000');
    htmlVal += getLineBySlope(outsidePt7, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#FF0000');
    htmlVal += getLineBySlope(outsidePt8, slope, parentImg.ImgWidth, parentImg.ImgHeight, '#FF0000');
    /* IANS END  */
    

    if (fstPt.X > sndPt.X) {
        lhsPoint = sndPt;
        rhsPoint = fstPt;
    }
    else {
        lhsPoint = fstPt;
        rhsPoint = sndPt;
    }

    htmlVal += getHtmlForPointToPointLine(lhsPoint, rhsPoint, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'PFG_pe', colBetnPoints);

    canvasDiv.append(htmlVal);
}

function getMidPoint(pt1, pt2) {
    xVal = (pt1.X + pt2.X) / 2;
    yVal = (pt1.Y + pt2.Y) / 2;

    return (new Point(xVal, yVal));
}

function getOutsidePoint(startPt, endPt, cFactor) {
    xVal = startPt.X + ((startPt.X - endPt.X) * cFactor);
    yVal = startPt.Y + ((startPt.Y - endPt.Y) * cFactor);

    return (new Point(xVal, yVal));
}


/******************************************************
******** Price Expansion Generator ********
******************************************************/

var ExpansionType = {
    Upwards: 736,
    Downwards: 737
};

$.fn.makePriceExpansion = function(config) {
    var PEG_isPriceExpansionGenMaskKeyDown = false;
    var PEG_isPriceExpansionSpecialKeyDown = false;
    var PEG_firstPoint = null;
    var PEG_secondPoint = null;
    var PEG_thirdPoint = null;
    var PEG_isFirstPointDrawn = false;
    var PEG_isSecondPointDrawn = false;
    var PEG_isThirdPointDrawn = false;
    var PEGcanvasDiv;
    var PEGcanvasDiv_parentImg;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.priceExpansionGenMaskKeyCode:
                PEG_isPriceExpansionGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                PEG_isPriceExpansionSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        PEG_isPriceExpansionGenMaskKeyDown = false;
        PEG_isPriceExpansionSpecialKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        PEG_isFirstPointDrawn = false;
        PEG_isSecondPointDrawn = false;
        PEG_isThirdPointDrawn = false;
        $(this).children("div.PEGcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!PEG_isPriceExpansionGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            PEG_isPriceExpansionGenMaskKeyDown = false;
            PEG_isPriceExpansionSpecialKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        PEGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        PEGcanvasDiv = $(this).children("div.PEGcanvas");
        if (!PEGcanvasDiv.attr("class")) {
            PEGcanvasDiv = $("<div class=\"PEGcanvas\"></div>");
            PEGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(PEGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > PEGcanvasDiv_parentImg.ImgWidth || currentY > PEGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!PEG_isFirstPointDrawn && !PEG_isSecondPointDrawn && !PEG_isThirdPointDrawn) {
            PEG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(PEGcanvasDiv, PEG_firstPoint, 'PEG_pt1', pointOffset);
            PEG_isFirstPointDrawn = true;
        }
        else if (PEG_isFirstPointDrawn && !PEG_isSecondPointDrawn && !PEG_isThirdPointDrawn) {
            PEG_secondPoint = new Point(currentX, currentY);
            if (PEG_secondPoint.X <= PEG_firstPoint.X) {
                fstPtObj.remove();
                PEG_isPriceExpansionGenMaskKeyDown = false;
                PEG_isPriceExpansionSpecialKeyDown = false;
                PEG_isFirstPointDrawn = false;
                return;
            }
            sndPtObj = drawCanvasPoint(PEGcanvasDiv, PEG_secondPoint, 'PEG_pt2', pointOffset);
            PEG_isSecondPointDrawn = true;
        }
        else if (PEG_isFirstPointDrawn && PEG_isSecondPointDrawn && !PEG_isThirdPointDrawn) {
            PEG_thirdPoint = new Point(currentX, currentY);

            if (PEG_thirdPoint.X <= PEG_secondPoint.X) {
                fstPtObj.remove();
                sndPtObj.remove();
                PEG_isPriceExpansionGenMaskKeyDown = false;
                PEG_isPriceExpansionSpecialKeyDown = false;
                PEG_isFirstPointDrawn = false;
                PEG_isSecondPointDrawn = false;
                return;
            }
            drawCanvasPoint(PEGcanvasDiv, PEG_thirdPoint, 'PEG_pt3', pointOffset);
            PEG_isThirdPointDrawn = true;
        }

        if (PEG_isFirstPointDrawn && PEG_isSecondPointDrawn && PEG_isThirdPointDrawn) {
            var ratios = config.expansionRatio1;
            if(PEG_isPriceExpansionSpecialKeyDown){
                ratios = config.expansionRatio2;
            }
            drawThisPriceExpansion(PEGcanvasDiv, PEGcanvasDiv_parentImg, PEG_firstPoint, PEG_secondPoint, PEG_thirdPoint, ratios, config.colorBetweenPoints, config.priceExpansionGenMaskKeyCode);
            PEG_isFirstPointDrawn = false;
            PEG_isSecondPointDrawn = false;
            PEG_isThirdPointDrawn = false;
        }
        
        
    });

    return $(this);
};

function drawThisPriceExpansion(canvasDiv, parentImg, fstPt, sndPt, trdPt, expRatio, colBetnPoints, keyBoardNumber) {
    var lhsPoint, rhsPoint;
    var yVal;
    var tempRatio;
    var descText;
  
    htmlVal = "";
    tempRatio = 0;
    descText = "";

    htmlVal += getHtmlForPointToPointLine(fstPt, sndPt, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'PFG_pe', colBetnPoints);
    htmlVal += getHtmlForPointToPointLine(sndPt, trdPt, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'PFG_pe', colBetnPoints);


    for (cnt = 0; cnt < expRatio.length; cnt++) {
    
        if (keyBoardNumber == 65)
        {
            yVal = trdPt.Y + ((sndPt.Y - fstPt.Y) * expRatio[cnt]);
            tempRatio = Math.floor(expRatio[cnt] * 1000)/10;
            descText = "<div style = 'font-family:arial;position:relative;right:45px;color:grey;'>" + tempRatio +"%</div>";
        }
        else if (keyBoardNumber == 76)
        {
            yVal = trdPt.Y + ((sndPt.Y - trdPt.Y) * expRatio[cnt]);
            if (trdPt.Y > sndPt.Y){
                    if (expRatio[cnt] == 0)
                        descText = "<div style = 'font-family:arial;position:relative;right:45px;color:Black;'>Sup</div>";
                    else if (expRatio[cnt] == 1)
                       descText = "<div style = 'font-family:arial;position:relative;right:45px;color:Black;'>Res</div>";
                    else
                       descText = "";
            } else  if (trdPt.Y < sndPt.Y){
                    if (expRatio[cnt] == 0)
                        descText = "<div style = 'font-family:arial;position:relative;right:45px;color:Black;'>Res</div>";
                    else if (expRatio[cnt] == 1)
                       descText = "<div style = 'font-family:arial;position:relative;right:45px;color:Black;'>Sup</div>";  
                    else
                       descText = "";   
            }
            
           
        }
        
        
        if ((yVal < 0) || (yVal > parentImg.ImgHeight)) {
            break;
        }


        newPt = new Point(trdPt.X, yVal);
        htmlVal += getHorizontalLineForPoint1(newPt, parentImg.ImgWidth, 'PEG_pe' + cnt, descText);
    }

    canvasDiv.append(htmlVal);
}

/******************************************************
******** BullBear Generator ********
******************************************************/

$.fn.makeBullBear = function(config) {
    var BBG_isBBGridMaskKeyDown = false;
    var BBG_isBBArcMaskKeyDown = false;
    var BBG_isBBArcAngleMaskKeyDown = false;
    var BBG_isBBArcAngleGridMaskKeyDown = false;
    var BBG_firstPoint = null;
    var BBG_secondPoint = null;
    var BBG_isFirstPointDrawn = false;
    var BBG_isSecondPointDrawn = false;
    var BBGcanvasDiv;
    var BBGcanvasDiv_parentImg;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.bullBearGridMaskKeyCode:
                BBG_isBBGridMaskKeyDown = true;
                break;
            case config.bullBearArcMaskKeyCode:
                BBG_isBBArcMaskKeyDown = true;
                break;
            case config.bullBearArcAngleMaskKeyCode:
                BBG_isBBArcAngleMaskKeyDown = true;
                break;
            case config.bullBearArcAngleGridMaskKeyCode:
                BBG_isBBArcAngleGridMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    function resetMaskKeys_BB() {
        BBG_isBBGridMaskKeyDown = false;
        BBG_isBBArcMaskKeyDown = false;
        BBG_isBBArcAngleMaskKeyDown = false;
        BBG_isBBArcAngleGridMaskKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetMaskKeys_BB();
    });

    $(this).dblclick(function(evt) {
        BBG_isFirstPointDrawn = false;
        BBG_isSecondPointDrawn = false;
        $(this).children("div.BBGcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;
        var lineHtml = "";
        var startAngle, endAngle;

        if (!BBG_isBBGridMaskKeyDown &&
            !BBG_isBBArcMaskKeyDown &&
            !BBG_isBBArcAngleMaskKeyDown &&
            !BBG_isBBArcAngleGridMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            resetMaskKeys_BB();
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        BBGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        BBGcanvasDiv = $(this).children("div.BBGcanvas");
        if (!BBGcanvasDiv.attr("class")) {
            BBGcanvasDiv = $("<div class=\"BBGcanvas\"></div>");
            BBGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(BBGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > BBGcanvasDiv_parentImg.ImgWidth || currentY > BBGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!BBG_isFirstPointDrawn && !BBG_isSecondPointDrawn) {
            BBG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(BBGcanvasDiv, BBG_firstPoint, 'BBG_pt1', pointOffset);
            BBG_isFirstPointDrawn = true;
        }
        else if (BBG_isFirstPointDrawn && !BBG_isSecondPointDrawn) {
            BBG_secondPoint = new Point(currentX, currentY);
            if (BBG_secondPoint.X <= BBG_firstPoint.X) {
                fstPtObj.remove();
                BBG_isFirstPointDrawn = false;
                resetMaskKeys_BB();
                return;
            }
            drawCanvasPoint(BBGcanvasDiv, BBG_secondPoint, 'BBG_pt2', pointOffset);
            BBG_isSecondPointDrawn = true;
        }

        if (BBG_isFirstPointDrawn && BBG_isSecondPointDrawn) {

            lineHtml += getHtmlForPointToPointLine(BBG_firstPoint, BBG_secondPoint, BBGcanvasDiv_parentImg.ImgWidth, BBGcanvasDiv_parentImg.ImgHeight, TrendLineType.ConnectedLine, 'BBG_pe', config.colorBetweenPoints);
            if (BBG_firstPoint.Y > BBG_secondPoint.Y) {
                gridColor = config.bullGridColor;
                isBear = false;
                startAngle = -90;
                endAngle = 0;
                lineTypeForAngle = AG_LineType.NEGETIVE;
            }
            else {
                gridColor = config.bearGridColor;
                isBear = true;
                startAngle = 0;
                endAngle = 90;
                lineTypeForAngle = AG_LineType.POSITIVE;
            }

            var radius1 = getRadius(BBG_firstPoint, BBG_secondPoint);

            if (BBG_isBBGridMaskKeyDown) {
                lineHtml += getHtmlForGrid(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, 'BBG_pe', gridColor, isBear);
                lineHtml += getHtmlForArc(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, config.firstArcColor, startAngle, endAngle, config.firstArcAdj, config.solidArcColor, config.dashedArcColor, true);
            }
            else if (BBG_isBBArcMaskKeyDown) {
                lineHtml += getHtmlForArc(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, config.firstArcColor, startAngle, endAngle, config.firstArcAdj, config.solidArcColor, config.dashedArcColor, false);
            }
            else if (BBG_isBBArcAngleMaskKeyDown) {
                maxX = getMaxX(BBG_firstPoint, radius1, BBGcanvasDiv_parentImg);
                maxY = getMaxY(BBG_firstPoint, radius1, BBGcanvasDiv_parentImg, isBear);
                degrees = config.angleDegrees;
                for (i = 0; i < degrees.length; i++) {
                    lineHtml += getHtmlForLine(lineTypeForAngle, BBG_firstPoint.X, BBG_firstPoint.Y, degrees[i], maxX, maxY, 'AG_pe' + i);
                }
                lineHtml += getHtmlForArc(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, config.firstArcColor, startAngle, endAngle, config.firstArcAdj, config.solidArcColor, config.dashedArcColor, false);
            }
            else if (BBG_isBBArcAngleGridMaskKeyDown) {
                maxX = getMaxX(BBG_firstPoint, radius1, BBGcanvasDiv_parentImg);
                maxY = getMaxY(BBG_firstPoint, radius1, BBGcanvasDiv_parentImg, isBear);
                degrees = config.angleDegrees;
                for (i = 0; i < degrees.length; i++) {
                    lineHtml += getHtmlForLine(lineTypeForAngle, BBG_firstPoint.X, BBG_firstPoint.Y, degrees[i], maxX, maxY, 'AG_pe' + i);
                }
                lineHtml += getHtmlForGrid(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, 'BBG_pe', gridColor, isBear);
                lineHtml += getHtmlForArc(BBGcanvasDiv_parentImg, BBG_firstPoint, BBG_secondPoint, config.firstArcColor, startAngle, endAngle, config.firstArcAdj, config.solidArcColor, config.dashedArcColor, false);
            }
            BBGcanvasDiv.append(lineHtml);
            BBG_isFirstPointDrawn = false;
            BBG_isSecondPointDrawn = false;
            resetMaskKeys_BB();
        }
    });

    return $(this);
};

function getMaxX(fstPt1, radius1, parentImg1) {
    var maxX1;
    maxX1 = fstPt1.X + (radius1 * 5);
    if (maxX1 > parentImg1.ImgWidth) {
        maxX1 = parentImg1.ImgWidth;
    }

    return maxX1;
}

function getMaxY(fstPt1, radius1, parentImg1, isBearFlag1) {
    var maxY1;
    if (isBearFlag1) {
        maxY1 = fstPt1.Y + (radius1 * 5);
        if (maxY1 > parentImg1.ImgHeight) {
            maxY1 = parentImg1.ImgHeight;
        }
    }
    else {
        maxY1 = fstPt1.Y - (radius1 * 5);
        if (maxY1 < 0) {
            maxY1 = 0;
        }
    }

    return maxY1;
}

function getHtmlForGrid(parentImg, fstPt, sndPt, cssCls, gridColor1, isBearFlag) {
    var tempHtml1 = "";
    var tempSndPt = sndPt;
    var radius = getRadius(fstPt, tempSndPt);
    var maxY;

    var maxX = fstPt.X + (radius * 5);
    if (maxX > parentImg.ImgWidth) {
        maxX = parentImg.ImgWidth;
    }
    if (isBearFlag) {
        maxY = fstPt.Y + (radius * 5);
        if (maxY > parentImg.ImgHeight) {
            maxY = parentImg.ImgHeight;
        }
    }
    else {
        maxY = fstPt.Y - (radius * 5);
        if (maxY < 0) {
            maxY = 0;
        }
    }

    for (i = 0; i <= 5; i++) {
        xCurr = fstPt.X + (i * radius);
        yCurr = fstPt.Y;

        if (isBearFlag && (xCurr < parentImg.ImgWidth)) {
            heightVal = maxY - yCurr;
            tempHtml1 += "<div class='" + cssCls + "' style='left: " + xCurr + "px; top: " + yCurr + "px;background-color:" + gridColor1 + "; height:" + heightVal + "px'></div>";
        }

        if (!isBearFlag && (xCurr < parentImg.ImgWidth)) {
            heightVal = yCurr - maxY;
            tempHtml1 += "<div class='" + cssCls + "' style='left: " + xCurr + "px; top: " + maxY + "px;background-color:" + gridColor1 + "; height:" + heightVal + "px'></div>";
        }
    }

    for (i = 0; i <= 5; i++) {
        xCurr = fstPt.X;
        if (isBearFlag) {
            yCurr = fstPt.Y + (i * radius);
        }
        else {
            yCurr = fstPt.Y - (i * radius);
        }

        widthVal = maxX - xCurr;
        if (isBearFlag && (yCurr < parentImg.ImgHeight)) {
            tempHtml1 += "<div class='" + cssCls + "' style='left: " + xCurr + "px; top: " + yCurr + "px;background-color:" + gridColor1 + "; width:" + widthVal + "px'></div>";
        }

        if (!isBearFlag && (yCurr > 0)) {
            tempHtml1 += "<div class='" + cssCls + "' style='left: " + xCurr + "px; top: " + yCurr + "px;background-color:" + gridColor1 + "; width:" + widthVal + "px'></div>";
        }
    }

    return tempHtml1;
}

function getHtmlForArc(parentImg, fstPt, sndPt, lineColor, startAngle, endAngle, firstArcAdj1, solidArcColor1, dashedArcColor1, isOnlyFirstArc1) {
    var tempHtml = "";

    if (endAngle <= startAngle) {
        return "";
    }

    // X1, Y1
    tempSndPt = sndPt;
    var radius = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius, startAngle, endAngle, parentImg, lineColor);

    if (isOnlyFirstArc1) {
        return tempHtml;
    }

    // X3, Y3
    tempSndPt.X = fstPt.X + radius;
    tempSndPt.Y = fstPt.Y + radius;
    var radius3 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius3, startAngle, endAngle, parentImg, solidArcColor1);

    // X2, Y2
    var radius2 = radius3 * firstArcAdj1;
    tempHtml += getArcHtmlForRadius(fstPt, radius2, startAngle, endAngle, parentImg, solidArcColor1);

    // X4, Y4
    tempSndPt.X = fstPt.X + (radius * 2);
    tempSndPt.Y = fstPt.Y;
    var radius4 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius4, startAngle, endAngle, parentImg, dashedArcColor1);

    // X5, Y5
    tempSndPt.X = fstPt.X + (radius * 2);
    tempSndPt.Y = fstPt.Y + radius;
    var radius5 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius5, startAngle, endAngle, parentImg, dashedArcColor1);

    // X6, Y6
    tempSndPt.X = fstPt.X + (radius * 3);
    tempSndPt.Y = fstPt.Y;
    var radius6 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius6, startAngle, endAngle, parentImg, solidArcColor1);

    // X7, Y7
    tempSndPt.X = fstPt.X + (radius * 3);
    tempSndPt.Y = fstPt.Y + radius;
    var radius7 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius7, startAngle, endAngle, parentImg, solidArcColor1);

    // X8, Y8
    tempSndPt.X = fstPt.X + (radius * 4);
    tempSndPt.Y = fstPt.Y;
    var radius8 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius8, startAngle, endAngle, parentImg, dashedArcColor1);

    // X9, Y9
    tempSndPt.X = fstPt.X + (radius * 4);
    tempSndPt.Y = fstPt.Y + radius;
    var radius9 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius9, startAngle, endAngle, parentImg, dashedArcColor1);

    // X10, Y10
    tempSndPt.X = fstPt.X + (radius * 5);
    tempSndPt.Y = fstPt.Y;
    var radius10 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius10, startAngle, endAngle, parentImg, solidArcColor1);

    // X11, Y11
    tempSndPt.X = fstPt.X + (radius * 5);
    tempSndPt.Y = fstPt.Y + radius;
    var radius11 = getRadius(fstPt, tempSndPt);
    tempHtml += getArcHtmlForRadius(fstPt, radius11, startAngle, endAngle, parentImg, solidArcColor1);

    return tempHtml;
}

function getRadius(fstPt, sndPt) {
    var xDiff = sndPt.X - fstPt.X;
    var yDiff = sndPt.Y - fstPt.Y;

    var radius2 = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    return radius2;
}

function getArcHtmlForRadius(fstPt, radius1, startAngle, endAngle, parentImg, lineColor) {
    var incrementVal = 0;
    var tempHtml1 = "";

    if (radius1 <= 50) {
        incrementVal += 1;
    }
    else if (radius1 <= 100) {
        incrementVal += 0.6;
    }
    else if (radius1 <= 150) {
        incrementVal += 0.4;
    }
    else if (radius1 <= 320) {
        incrementVal += 0.2;
    }
    else {
        incrementVal += 0.1;
    }

    for (i = startAngle; i < endAngle; i += incrementVal) {
        sinVal = Math.sin(Math.PI * i / 180);
        cosVal = Math.cos(Math.PI * i / 180);

        xVal = fstPt.X + (radius1 * cosVal);
        yVal = fstPt.Y + (radius1 * sinVal);
        if ((xVal > 0) && (xVal < parentImg.ImgWidth) && (yVal > 0) && (yVal < parentImg.ImgHeight)) {
            tempHtml1 += "<div class='BBG_pe' style='left: " + xVal + "px; top: " + yVal + "px;background-color:" + lineColor + "'></div>";
        }
    }

    return tempHtml1;
}

/******************************************************
******** Horizontal Generator ********
******************************************************/

$.fn.makeHorizontalLines = function(config) {
    var HG_isHorizontalMaskKeyDown = false;

    var HG_point = null;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.horizontalMaskKeyCode:
                HG_isHorizontalMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    function resetMaskKeys_HG() {
        HG_isHorizontalMaskKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetMaskKeys_HG();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.HGcanvas").remove();
    });

    var HGcanvasDiv;
    var HGcanvasDiv_parentImg;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var htmlVal = "";

        if (!HG_isHorizontalMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            HG_isHorizontalMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        HGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        HGcanvasDiv = $(this).children("div.HGcanvas");
        if (!HGcanvasDiv.attr("class")) {
            HGcanvasDiv = $("<div class=\"HGcanvas\"></div>");
            HGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(HGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > HGcanvasDiv_parentImg.ImgWidth || currentY > HGcanvasDiv_parentImg.ImgHeight) {
            return;
        }
        if (HG_isHorizontalMaskKeyDown) {
            newPt = new Point(0, currentY);
            htmlVal += getHorizontalLineForPoint1(newPt, HGcanvasDiv_parentImg.ImgWidth, 'HG_HLine', "");
        }

        HGcanvasDiv.append(htmlVal);
    });

    return $(this);
};

/******************************************************
******** Vertical Generator ********
******************************************************/

$.fn.makeVerticalLines = function(config) {
    var VG_isVerticalMaskKeyDown = false;

    var VG_point = null;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.verticalMaskKeyCode:
                VG_isVerticalMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    function resetMaskKeys_VG() {
        VG_isVerticalMaskKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetMaskKeys_VG();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.VGcanvas").remove();
    });

    var VGcanvasDiv;
    var VGcanvasDiv_parentImg;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var htmlVal = "";

        if (!VG_isVerticalMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            VG_isVerticalMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        VGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        VGcanvasDiv = $(this).children("div.VGcanvas");
        if (!VGcanvasDiv.attr("class")) {
            VGcanvasDiv = $("<div class=\"VGcanvas\"></div>");
            VGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(VGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > VGcanvasDiv_parentImg.ImgWidth || currentY > VGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (VG_isVerticalMaskKeyDown) {
            newPt = new Point(currentX, 0);
            htmlVal += getVerticalLineForPoint1(newPt, VGcanvasDiv_parentImg.ImgHeight, 'VG_VLine');
        }

        VGcanvasDiv.append(htmlVal);
    });

    return $(this);
};

/******************************************************
******** Fibonacci Fan Generator ********
******************************************************/

$.fn.makeFibonacciFan = function(config) {
    var FFG_isFobonacciFanGenMaskKeyDown = false;
    var FFG_isFobonacciFanSpecialKeyDown = false;  
    var FFG_isFirstPointDrawn = false;
    var FFG_isSecondPointDrawn = false;
    var FFG_firstPoint;
    var FFG_secondPoint;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.fibonacciFanGenMaskKeyCode:
                FFG_isFobonacciFanGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                FFG_isFobonacciFanSpecialKeyDown = true;  
                break;
            default:
                break;
        }
    });


    $(document).keyup(function(evt) {
        FFG_isFobonacciFanGenMaskKeyDown = false;
        FFG_isFobonacciFanSpecialKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.FFGcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lineHtml;
        var FFGcanvasDiv;
        var FFGcanvasDiv_parentImg;
        var ptOffset = 2;
        var lhsPoint, rhsPoint;
        var pointOffset = 2;

        if (!FFG_isFobonacciFanGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            FFG_isFobonacciFanGenMaskKeyDown = false;
            FFG_isFobonacciFanSpecialKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        FFGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        FFGcanvasDiv = $(this).children("div.FFGcanvas");
        if (!FFGcanvasDiv.attr("class")) {
            FFGcanvasDiv = $("<div class=\"FFGcanvas\"></div>");
            FFGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(FFGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > FFGcanvasDiv_parentImg.ImgWidth || currentY > FFGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!FFG_isFirstPointDrawn) {
            FFG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(FFGcanvasDiv, FFG_firstPoint, 'FFG_pt1', pointOffset);
            FFG_isFirstPointDrawn = true;
            return;
        }

        if (!FFG_isSecondPointDrawn) {
            if (currentX < FFG_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                FFG_isFirstPointDrawn = false;
                return;
            }
            FFG_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(FFGcanvasDiv, FFG_secondPoint, 'FFG_pt2', pointOffset);
            FFG_isSecondPointDrawn = true;
        }

        if (FFG_isFirstPointDrawn && FFG_isSecondPointDrawn) {
            lineHtml = "";
            lineGap = Math.abs(FFG_firstPoint.Y - FFG_secondPoint.Y);
            var ratios = config.fibonacciFanPercentage1;
            if(FFG_isFobonacciFanSpecialKeyDown){
                ratios = config.fibonacciFanPercentage2;
            }
            lineHtml += getHtmlLineFibonacciFan(FFGcanvasDiv, FFG_firstPoint, FFG_secondPoint, FFGcanvasDiv_parentImg, lineGap, ratios);

            if (FFG_firstPoint.X > FFG_secondPoint.X) {
                lhsPoint = FFG_secondPoint;
                rhsPoint = FFG_firstPoint;
            }
            else {
                lhsPoint = FFG_firstPoint;
                rhsPoint = FFG_secondPoint;
            }

            lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.ConnectedLine, 'FFG_pe', config.colorBetweenPoints);


            FFGcanvasDiv.append(lineHtml);

            FFG_isFirstPointDrawn = false;
            FFG_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getHtmlLineFibonacciFan(cnv, fstPt, sndPt, parentImgObj, lineGapVal, fibonacciFanPer) {
    var tempHtml = "";

    if (fstPt.Y == sndPt.Y) {
        tempHtml += "<div class='FFG_HLine FFG_pe0' style='left: 0px; top:" + fstPt.Y + "px; width: " + parentImgObj.ImgWidth + "px'></div>";
    }
    for (cnt = 0; cnt < fibonacciFanPer.length; cnt++) {
        var nxtTopVal;
        var nxtPoint;
        if (fibonacciFanPer[cnt] >= 0) {
            if (fstPt.Y < sndPt.Y) {
                nxtTopVal = sndPt.Y - (lineGapVal * fibonacciFanPer[cnt]);
            }
            else if (fstPt.Y > sndPt.Y) {
                nxtTopVal = sndPt.Y + (lineGapVal * fibonacciFanPer[cnt]);
            }

            nxtPoint = new Point(sndPt.X, nxtTopVal);

            slope1 = (nxtPoint.Y - fstPt.Y) / (nxtPoint.X - fstPt.X);
            
            var tempRatio = (fibonacciFanPer[cnt] * 1000)/10;
            var tempText = "<div style = 'font-family:arial;position:relative;right:30px;color:blue;'>" + tempRatio +"%</div>";
             
            tempHtml += getLineBySlope_2(fstPt, slope1, parentImgObj.ImgWidth, parentImgObj.ImgHeight, 'FFG_pe' + cnt, tempText);
            
        }
    }

    return tempHtml;
}

/******************************************************
******** Textbox Generator ********
******************************************************/

$.fn.makeTextboxes = function(config) {
    var TBG_isTextBoxGenKeyDown = false;

    var TBG_point = null;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.textBoxMaskKeyCode:
                TBG_isTextBoxGenKeyDown = true;
                break;
            default:
                break;
        }
    });

    function resetMaskKeys_TBG() {
        TBG_isTextBoxGenKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetMaskKeys_TBG();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.TBGcanvas").remove();
    });

    var TBGcanvasDiv;
    var TBGcanvasDiv_parentImg;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var htmlVal = "";

        if (!TBG_isTextBoxGenKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            TBG_isTextBoxGenKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        TBGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        TBGcanvasDiv = $(this).children("div.TBGcanvas");
        if (!TBGcanvasDiv.attr("class")) {
            TBGcanvasDiv = $("<div class=\"TBGcanvas\"></div>");
            TBGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(TBGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > TBGcanvasDiv_parentImg.ImgWidth || currentY > TBGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (TBG_isTextBoxGenKeyDown) {
            newPoint = new Point(currentX, currentY);
            addTextBoxForPoint(TBGcanvasDiv, newPoint, TBGcanvasDiv_parentImg.ImgHeight, 'TBG_TextBox', config.maxLength);
        }
    });

    return $(this);
};

function addTextBoxForPoint(cnvObj, newPt, imgHeight, cssCls, maxLen) {
    var tempHtml;

    tempHtml = $("<textarea class='" + cssCls + "' style='left:" + newPt.X + "px; top: " + newPt.Y + "px;'></textarea>");

    tempHtml.blur(function() {
        $(this).addClass("TBG_Fixed");
        if ($(this).attr("value").length > maxLen) {
            $(this).remove();
        }
    });
    tempHtml.click(function() {
        $(this).removeClass("TBG_Fixed");
    });
    tempHtml.keypress(function(event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            return true;
        }
        if ($(this).attr("value").length >= maxLen) {
            return false;
        }
    });

    cnvObj.append(tempHtml);
}

/******************************************************
******** Point locator ********
******************************************************/

$.fn.locatePoint = function(config) {
    var PL_imgWidth = 0;
    var PL_imgHeight = 0;
    var PL_imgTop = 0;
    var PL_imgLeft = 0;

    var PL_imgObj = $(this).children('img');
    PL_imgTop = PL_imgObj.offset().top;
    PL_imgLeft = PL_imgObj.offset().left;
	PL_imgWidth = PL_imgObj.width();
	PL_imgHeight = PL_imgObj.height();

    PLcanvasDiv = $("<div class=\"PLcanvas\">X: 0, Y: 0</div>");
    PLcanvasDiv.css({
        'left': (PL_imgLeft + PL_imgWidth - 90) + 'px',
        'top': (PL_imgTop + PL_imgHeight - 27) + 'px'
    });
    PLcanvasDiv.css({ 'opacity': 0.8 });
    $(this).append(PLcanvasDiv);

    PL_imgObj.mouseenter(function() {
        PL_imgObj.next("div.PLcanvas").css({ 'display': 'block' });
    });

    PL_imgObj.mouseleave(function() {
        PL_imgObj.next("div.PLcanvas").css({ 'display': 'none' });
    });

    PL_imgObj.mousemove(function(evt) {
        currentX = evt.pageX - PL_imgLeft;
        currentY = evt.pageY - PL_imgTop;
        PL_imgObj.next("div.PLcanvas").html("X: " + currentX + ", Y: " + currentY);
    });

    return $(this);
};

/******************************************************
******** GoldenRatioHorizontal Generator ********
******************************************************/

$.fn.makeGoldenRatioH = function(config) {
    var GR_isGoldenGenMaskKeyDown = false;
    var GR_isFirstPointDrawn = false;
    var GR_isSecondPointDrawn = false;
    var GR_firstPoint;
    var GR_secondPoint;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.horizontalMaskKeyCode:
                GR_isGoldenGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        GR_isGoldenGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.GRcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lineHtml;
        var GRcanvasDiv;
        var GRcanvasDiv_parentImg;
        var ptOffset = 2;
        var lhsPoint, rhsPoint;
        var pointOffset = 2;

        if (!GR_isGoldenGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            GR_isGoldenGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        GRcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        GRcanvasDiv = $(this).children("div.GRcanvas");
        if (!GRcanvasDiv.attr("class")) {
            GRcanvasDiv = $("<div class=\"GRcanvas\"></div>");
            GRcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(GRcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > GRcanvasDiv_parentImg.ImgWidth || currentY > GRcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!GR_isFirstPointDrawn) {
            GR_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(GRcanvasDiv, GR_firstPoint, 'FFG_pt1', pointOffset);
            GR_isFirstPointDrawn = true;
            return;
        }

        if (!GR_isSecondPointDrawn) {
            if (currentY == GR_firstPoint.Y) {
                fstPtObj.remove();
                fstPtObj = null;
                GR_isFirstPointDrawn = false;
                return;
            }
            GR_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(GRcanvasDiv, GR_secondPoint, 'FFG_pt2', pointOffset);
            GR_isSecondPointDrawn = true;
        }

        if (GR_isFirstPointDrawn && GR_isSecondPointDrawn) {
            lineHtml = "";
            lineHtml += getHtmlGoldenRatioH(GR_firstPoint.Y, GR_secondPoint.Y, GRcanvasDiv_parentImg.ImgWidth,GRcanvasDiv_parentImg.ImgHeight, config);

            GRcanvasDiv.append(lineHtml);

            GR_isFirstPointDrawn = false;
            GR_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getHtmlGoldenRatioH(fstPtTop, sndPtTop, widthVal, heightVal, conf) {
    var tempHtml = "";
    tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + fstPtTop + "px; width: " + widthVal + "px;background-color:#f00'></div>";
    tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + sndPtTop + "px; width: " + widthVal + "px;background-color:#f00'></div>";
    var distance = sndPtTop - fstPtTop;
    var firstDistance = sndPtTop + distance * conf.firstDistance;
    var secondDistance = sndPtTop + distance * conf.secondDistance;
    var tempDistance0 = sndPtTop - distance * 0.5;
    var tempDistance1 = sndPtTop + distance * 0.381966;
    var tempDistance2 = sndPtTop + distance * 0.786151;
    var tempDistance3 = sndPtTop + distance;
    if(firstDistance >=0 && firstDistance<=heightVal)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + firstDistance + "px; width: " + widthVal + "px;background-color:"+ conf.lineColor +"'></div>";
    if(secondDistance >=0 && secondDistance<=heightVal)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + secondDistance + "px; width: " + widthVal + "px;background-color:"+ conf.secondLineColor +"'></div>";
    if(tempDistance0 >=0)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + tempDistance0 + "px; width: " + widthVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance1 >=0 && tempDistance1<=heightVal)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + tempDistance1 + "px; width: " + widthVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance2 >=0 && tempDistance2<=heightVal)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + tempDistance2 + "px; width: " + widthVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance3 >=0 && tempDistance3<=heightVal)tempHtml += "<div class='HG_HLine GR_Line' style='left: 0px; top:" + tempDistance3 + "px; width: " + widthVal + "px;background-color:#f00'></div>";
    //console.log(tempHtml);
    return tempHtml;
}
/******************************************************
******** GoldenRatioVertical Generator ********
******************************************************/

$.fn.makeGoldenRatioV = function(config) {
    var GR_isGoldenGenMaskKeyDown = false;
    var GR_isFirstPointDrawn = false;
    var GR_isSecondPointDrawn = false;
    var GR_firstPoint=0;
    var GR_secondPoint=0;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.verticalMaskKeyCode:
                GR_isGoldenGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        GR_isGoldenGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.GRcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineGap, lineHtml;
        var GRcanvasDiv;
        var GRcanvasDiv_parentImg;
        var ptOffset = 2;
        var lhsPoint, rhsPoint;
        var pointOffset = 2;

        if (!GR_isGoldenGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            GR_isGoldenGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        GRcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        GRcanvasDiv = $(this).children("div.GRcanvas");
        if (!GRcanvasDiv.attr("class")) {
            GRcanvasDiv = $("<div class=\"GRcanvas\"></div>");
            GRcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(GRcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > GRcanvasDiv_parentImg.ImgWidth || currentY > GRcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!GR_isFirstPointDrawn) {
            GR_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(GRcanvasDiv, GR_firstPoint, 'FFG_pt1', pointOffset);
            GR_isFirstPointDrawn = true;
            return;
        }

        if (!GR_isSecondPointDrawn) {
            if (currentX == GR_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                GR_isFirstPointDrawn = false;
                return;
            }
            GR_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(GRcanvasDiv, GR_secondPoint, 'FFG_pt2', pointOffset);
            GR_isSecondPointDrawn = true;
        }

        if (GR_isFirstPointDrawn && GR_isSecondPointDrawn) {
            lineHtml = "";
            lineHtml += getHtmlGoldenRatioV(GR_firstPoint.X, GR_secondPoint.X, GRcanvasDiv_parentImg.ImgWidth,GRcanvasDiv_parentImg.ImgHeight, config);

            GRcanvasDiv.append(lineHtml);

            GR_isFirstPointDrawn = false;
            GR_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function getHtmlGoldenRatioV(fstPtLeft, sndPtLeft, widthVal, heightVal, conf) {
    var tempHtml = "";
    tempHtml += "<div class='HG_HLine GR_Line' style='top: 0px; left:" + fstPtLeft + "px; height: " + heightVal + "px;background-color:#f00'></div>";
    tempHtml += "<div class='HG_HLine GR_Line' style='top: 0px; left:" + sndPtLeft + "px; height: " + heightVal + "px;background-color:#f00'></div>";
    var distance = sndPtLeft - fstPtLeft;
    var firstDistance = sndPtLeft + distance * conf.firstDistance;
    var secondDistance = sndPtLeft + distance * conf.secondDistance;
    var tempDistance0 = sndPtLeft - distance * 0.5;
    var tempDistance1 = sndPtLeft + distance * 0.381966;
    var tempDistance2 = sndPtLeft + distance * 0.786151;
    var tempDistance3 = sndPtLeft + distance;
    if(firstDistance >=0 && firstDistance<=widthVal)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + firstDistance + "px; height: " + heightVal + "px;background-color:"+ conf.lineColor +"'></div>";
    if(secondDistance >=0 && secondDistance<=widthVal)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + secondDistance + "px; height: " + heightVal + "px;background-color:"+ conf.secondLineColor +"'></div>";
    if(tempDistance0 >=0)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + tempDistance0 + "px; height: " + heightVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance1 >=0 && tempDistance1<=widthVal)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + tempDistance1 + "px; height: " + heightVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance2 >=0 && tempDistance2<=widthVal)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + tempDistance2 + "px; height: " + heightVal + "px;background-color:#D3D3D3'></div>";
    if(tempDistance3 >=0 && tempDistance3<=widthVal)tempHtml += "<div class='VG_HLine GR_Line' style='top: 0px; left:" + tempDistance3 + "px; height: " + heightVal + "px;background-color:#f00'></div>";
    //console.log(tempHtml);
    return tempHtml;
}


////chnages made by rajveer 14-10-2014
/******************************************************
******** Rectangle Generator ********
******************************************************/

$.fn.makeRectangle = function(config) {
    var REC_isRectangleGenMaskKeyDown = false;
    var REC_firstPoint = null;
    var REC_secondPoint = null;
    var REC_isFirstPointDrawn = false;
    var REC_isSecondPointDrawn = false;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.rectangleMaskKeyCode:
                REC_isRectangleGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        REC_isRectangleGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        REC_isFirstPointDrawn = false;
        REC_isSecondPointDrawn = false;
        $(this).children("div.RECcanvas").remove();
    });

    var RECcanvasDiv;
    var RECcanvasDiv_parentImg;
    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!REC_isRectangleGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            REC_isRectangleGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        RECcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        RECcanvasDiv = $(this).children("div.RECcanvas");
        if (!RECcanvasDiv.attr("class")) {
            RECcanvasDiv = $("<div class=\"RECcanvas\"></div>");
            RECcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(RECcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > RECcanvasDiv_parentImg.ImgWidth || currentY > RECcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!REC_isFirstPointDrawn && !REC_isSecondPointDrawn) {
            REC_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(RECcanvasDiv, REC_firstPoint, 'REC_pt1', pointOffset);
            REC_isFirstPointDrawn = true;
        }
        else if (REC_isFirstPointDrawn && !REC_isSecondPointDrawn) {
            if (currentX < REC_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                REC_isFirstPointDrawn = false;
                return;
            }
            REC_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(RECcanvasDiv, REC_secondPoint, 'REC_pt2', pointOffset);
            REC_isSecondPointDrawn = true;
        }

        if (REC_isFirstPointDrawn && REC_isSecondPointDrawn) {

            drawRectangle(RECcanvasDiv,  REC_firstPoint, REC_secondPoint);
            REC_isFirstPointDrawn = false;
            REC_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function drawRectangle(canvasDiv, fstPt, sndPt) {
    var tempHtml;
    heightVal = fstPt.Y - sndPt.Y;
    widthval = sndPt.X - fstPt.X;
    if (heightVal > 0) {
        tempHtml = "<div class='REC' style='left: " + fstPt.X + "px; top: " + sndPt.Y + "px; height:" + heightVal + "px;width:" + widthval + "px;'></div>";
    }
    else {
        tempHtml = "<div class='REC' style='left: " + fstPt.X + "px; top: " + (sndPt.Y + heightVal) + "px; height:" + Math.abs(heightVal) + "px;width:" + widthval + "px;'></div>";
    }
    canvasDiv.append(tempHtml);
}



/******************************************************
******** Time Expansion Generator (sister to price expansion) ********
******************************************************/
var ExpansionType = {
    Upwards: 736,
    Downwards: 737
};

$.fn.makeTimeExpansion = function(config) {
    var PEGT_isTimeExpansionGenMaskKeyDown = false;
    var PEGT_isTimeExpansionSpecialKeyDown = false;
    var PEGT_firstPoint = null;
    var PEGT_secondPoint = null;
    var PEGT_thirdPoint = null;
    var PEGT_isFirstPointDrawn = false;
    var PEGT_isSecondPointDrawn = false;
    var PEGT_isThirdPointDrawn = false;
    var PEGTcanvasDiv;
    var PEGTcanvasDiv_parentImg;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.TimeExpansionGenMaskKeyCode:
                PEGT_isTimeExpansionGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                PEGT_isTimeExpansionSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        PEGT_isTimeExpansionGenMaskKeyDown = false;
        PEGT_isTimeExpansionSpecialKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        PEGT_isFirstPointDrawn = false;
        PEGT_isSecondPointDrawn = false;
        PEGT_isThirdPointDrawn = false;
        $(this).children("div.PEGTcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!PEGT_isTimeExpansionGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            PEGT_isTimeExpansionGenMaskKeyDown = false;
            PEGT_isTimeExpansionSpecialKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        PEGTcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        PEGTcanvasDiv = $(this).children("div.PEGTcanvas");
        if (!PEGTcanvasDiv.attr("class")) {
            PEGTcanvasDiv = $("<div class=\"PEGTcanvas\"></div>");
            PEGTcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(PEGTcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;

        if (currentX > PEGTcanvasDiv_parentImg.ImgWidth || currentY > PEGTcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!PEGT_isFirstPointDrawn && !PEGT_isSecondPointDrawn && !PEGT_isThirdPointDrawn) {
            PEGT_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(PEGTcanvasDiv, PEGT_firstPoint, 'PEGT_pt1', pointOffset);
            PEGT_isFirstPointDrawn = true;
        }
        else if (PEGT_isFirstPointDrawn && !PEGT_isSecondPointDrawn && !PEGT_isThirdPointDrawn) {
            PEGT_secondPoint = new Point(currentX, currentY);
            
//            if (PEGT_secondPoint.X <= PEGT_firstPoint.X) {
//                fstPtObj.remove();
//                PEGT_isTimeExpansionGenMaskKeyDown = false;
//                PEGT_isTimeExpansionSpecialKeyDown = false;
//                PEGT_isFirstPointDrawn = false;
//                return;
//            }
            
            sndPtObj = drawCanvasPoint(PEGTcanvasDiv, PEGT_secondPoint, 'PEGT_pt2', pointOffset);
            PEGT_isSecondPointDrawn = true;
        }
        else if (PEGT_isFirstPointDrawn && PEGT_isSecondPointDrawn && !PEGT_isThirdPointDrawn) {
            PEGT_thirdPoint = new Point(currentX, currentY);

//            //If third point to the left of first or second point remove all.
//            if (PEGT_thirdPoint.X <= PEGT_secondPoint.X) {
//                fstPtObj.remove();
//                sndPtObj.remove();
//                PEGT_isTimeExpansionGenMaskKeyDown = false;
//                PEGT_isTimeExpansionSpecialKeyDown = false;
//                PEGT_isFirstPointDrawn = false;
//                PEGT_isSecondPointDrawn = false;
//                return;
//            }

            drawCanvasPoint(PEGTcanvasDiv, PEGT_thirdPoint, 'PEGT_pt3', pointOffset);
            PEGT_isThirdPointDrawn = true;
        }

        if (PEGT_isFirstPointDrawn && PEGT_isSecondPointDrawn && PEGT_isThirdPointDrawn) {
            var ratios = config.expansionRatio1;
            if(PEGT_isTimeExpansionSpecialKeyDown){
                ratios = config.expansionRatio2;
            }
            drawThisTimeExpansion(PEGTcanvasDiv, PEGTcanvasDiv_parentImg, PEGT_firstPoint, PEGT_secondPoint, PEGT_thirdPoint, ratios, config.colorBetweenPoints, config.TimeExpansionGenMaskKeyCode);
            PEGT_isFirstPointDrawn = false;
            PEGT_isSecondPointDrawn = false;
            PEGT_isThirdPointDrawn = false;
        }
        
        
    });

    return $(this);
};

function drawThisTimeExpansion(canvasDiv, parentImg, fstPt, sndPt, trdPt, expRatio, colBetnPoints, keyBoardNumber) {
    var lhsPoint, rhsPoint;
    var xVal;
    var tempRatio;
    var descText;
    var ptWidth;
    var ptWidthPerc;   
    htmlVal = "";
    tempRatio = 0;
    descText = "";
    

    htmlVal += getHtmlForPointToPointLine(fstPt, sndPt, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'PFGT_pe', colBetnPoints);
    htmlVal += getHtmlForPointToPointLine(sndPt, trdPt, parentImg.ImgWidth, parentImg.ImgHeight, TrendLineType.ConnectedLine, 'PFGT_pe', colBetnPoints);


    for (cnt = 0; cnt < expRatio.length; cnt++) {
    
        ptWidth = sndPt.X - fstPt.X;
        ptWidthPerc = Math.abs((ptWidth / parentImg.ImgWidth) * 100);
        xVal = trdPt.X + (ptWidth * expRatio[cnt]);
        tempRatio = Math.floor(expRatio[cnt] * 1000)/10;
        
        
        if (ptWidthPerc > 10){
            descText = "<div style = 'font-family:arial;position:relative;left:2px;color:grey;'>" + tempRatio +"%</div>";
        }else{
            if (expRatio[cnt] % 1 === 0) {
                descText = "<div style = 'font-family:arial;position:relative;left:2px;color:grey;'>" + tempRatio +"%</div>";
            }else{
                descText="";}
        }    
        
        if ((xVal < 0) || (xVal > parentImg.ImgWidth)) {
            break;
        }
        
        newPt = new Point(xVal, trdPt.Y);
        heightVal = Math.abs(fstPt.Y - sndPt.Y);
        htmlVal += getVerticalLineForPoint2(newPt,  heightVal, parentImg.ImgHeight, 'PEG_pe PEGT_pe' + cnt, descText);
    }

    canvasDiv.append(htmlVal);
}







/******************************************************
******** T Theory Generator ********
******************************************************/

$.fn.makeTTheory = function(config) {
    var TTHY_isTTheoryGenMaskKeyDown = false;
    var TTHY_firstPoint = null;
    var TTHY_secondPoint = null;
    var TTHY_isFirstPointDrawn = false;
    var TTHY_isSecondPointDrawn = false;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.TTheoryMaskKeyCode:
                TTHY_isTTheoryGenMaskKeyDown = true;
                break;
            default:
                break;
        }
    });

    $(document).keyup(function(evt) {
        TTHY_isTTheoryGenMaskKeyDown = false;
    });

    $(this).dblclick(function(evt) {
        TTHY_isFirstPointDrawn = false;
        TTHY_isSecondPointDrawn = false;
        $(this).children("div.TTHYcanvas").remove();
    });

    var TTHYcanvasDiv;
    var TTHYcanvasDiv_parentImg;
    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        
        var imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY;
        var pointOffset = 2;

        if (!TTHY_isTTheoryGenMaskKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            TTHY_isTTheoryGenMaskKeyDown = false;
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        TTHYcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);
        


        TTHYcanvasDiv = $(this).children("div.TTHYcanvas");
        if (!TTHYcanvasDiv.attr("class")) {
            TTHYcanvasDiv = $("<div class=\"TTHYcanvas\"></div>");
            TTHYcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(TTHYcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;
        
        

        if (currentX > TTHYcanvasDiv_parentImg.ImgWidth || currentY > TTHYcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!TTHY_isFirstPointDrawn && !TTHY_isSecondPointDrawn) {
            TTHY_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(TTHYcanvasDiv, TTHY_firstPoint, 'TTHY_pt1', pointOffset);
            TTHY_isFirstPointDrawn = true;
        }
        else if (TTHY_isFirstPointDrawn && !TTHY_isSecondPointDrawn) {
            if (currentX < TTHY_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                TTHY_isFirstPointDrawn = false;
                return;
            }
            TTHY_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(TTHYcanvasDiv, TTHY_secondPoint, 'TTHY_pt2', pointOffset);
            TTHY_isSecondPointDrawn = true;
        }

        if (TTHY_isFirstPointDrawn && TTHY_isSecondPointDrawn) {

            drawTTheory(TTHYcanvasDiv, TTHYcanvasDiv_parentImg,  TTHY_firstPoint, TTHY_secondPoint, config.TTheoryMaskKeyCode);
            TTHY_isFirstPointDrawn = false;
            TTHY_isSecondPointDrawn = false;
        }
    });

    return $(this);
};

function drawTTheory(canvasDiv, parentImg, fstPt, sndPt, keyBoardNum) {
    var tempHtml;
    var adj;
    heightVal = fstPt.Y - sndPt.Y;
    widthval = sndPt.X - fstPt.X;
    adj = "";
    
    if (keyBoardNum == 50){
          adj = "0";
    }
    
    if (keyBoardNum == 49 || keyBoardNum == 50){
        newPt1 = new Point((fstPt.X + widthval), (sndPt.Y + heightVal));
        if (heightVal > 0) {
            tempHtml += "<div class='TTHYB' style='left: " + fstPt.X + "px; top: " + sndPt.Y + "px; height:" + heightVal + "px;width:" + widthval + "px;'></div>";
            tempHtml += getHorizontalLineForPoint2(newPt1, widthval, parentImg.ImgWidth, "TTHYBF1" + adj,"")
        }
        else {
            tempHtml += "<div class='TTHYT' style='left: " + fstPt.X + "px; top: " + (sndPt.Y + heightVal) + "px; height:" + Math.abs(heightVal) + "px;width:" + widthval + "px;'></div>";
            tempHtml += getHorizontalLineForPoint2(newPt1, widthval, parentImg.ImgWidth, "TTHYTF1" + adj,"")
        }
    }  
    
    //50% Dividers
    if (keyBoardNum == 50){
        if (heightVal > 0) {
            newPt2 = new Point((fstPt.X + (widthval/2)), (sndPt.Y + (heightVal/2)));
            newPt3 = new Point((fstPt.X + widthval + (widthval/2)), (sndPt.Y + (heightVal/2)));
            tempHtml += getVerticalLineForPoint2(newPt2, (heightVal/2), parentImg.ImgHeight, 'PEG_pe TTHY_pe1', "");    
            tempHtml += getVerticalLineForPoint2(newPt3, (heightVal/2), parentImg.ImgHeight, 'PEG_pe TTHY_pe2' + adj, "");         
        }
         else {
            newPt2 = new Point((fstPt.X + (widthval/2)), (sndPt.Y - Math.abs(heightVal)));
            newPt3 = new Point((fstPt.X + widthval + (widthval/2)), (sndPt.Y - Math.abs(heightVal)));
            tempHtml += getVerticalLineForPoint2(newPt2, (Math.abs(heightVal)/2), parentImg.ImgHeight, 'PEG_pe TTHY_pe1', ""); 
            tempHtml += getVerticalLineForPoint2(newPt3, (Math.abs(heightVal)/2), parentImg.ImgHeight, 'PEG_pe TTHY_pe2' + adj, "");   
        }
    } 
        
 
    canvasDiv.append(tempHtml);
}





/******************************************************
******** Gann Fan Generator ********
******************************************************/

//-------{
var GannFanType = {
    Retracement: 100,
    RetracementMirror: 101      
};
//----------}

$.fn.makeGannFan = function(config) {
    var GFG_isGannFanGenMaskKeyDown = false;
    var GFG_isGannFanGenMaskKeyMirrorKeyDown = false;
    var GFG_isGannFanSpecialKeyDown = false;
    var GFG_isFirstPointDrawn = false;
    var GFG_isSecondPointDrawn = false;
    var GFG_firstPoint;
    var GFG_secondPoint;

    $(document).keydown(function(evt) {
        switch (evt.keyCode) {
            case config.GannFanGenMaskKeyCode:
                GFG_isGannFanGenMaskKeyDown = true;
                break;
            case config.GannFanGenMaskKeyMirrorCode:
                GFG_isGannFanGenMaskKeyMirrorKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    $(document).keydown(function(evnt) {
        switch (evnt.keyCode) {
            case SpecKey.KEY1://Letter Y
                GFG_isGannFanSpecialKeyDown = true;
                break;
            default:
                break;
        }
    });
    
    function resetGannFanMaskKeys() {
        GFG_isGannFanGenMaskKeyDown = false;
        GFG_isGannFanGenMaskKeyMirrorKeyDown = false;
        GFG_isGannFanSpecialKeyDown = false;
    }

    $(document).keyup(function(evt) {
        resetGannFanMaskKeys();
    });

    $(this).dblclick(function(evt) {
        $(this).children("div.GFGcanvas").remove();
    });

    var fstPtObj, sndPtObj;

    $(this).click(function(evt) {
        var imgObj, imgTop, imgLeft, imgWidth, imgHeight, ptCssClass;
        var currentX, currentY, lineHtml;
        var GFGcanvasDiv;
        var GFGcanvasDiv_parentImg;
        var lhsPoint, rhsPoint;
        var pointOffset = 2;
        var degrees;

        if (!GFG_isGannFanGenMaskKeyDown && !GFG_isGannFanGenMaskKeyMirrorKeyDown) {
            return;
        }

        if (!checkBrowser()) {
            resetGannFanMaskKeys();
            return;
        }

        imgObj = $(this).children('img');
        imgTop = imgObj.offset().top;
        imgLeft = imgObj.offset().left;
        imgWidth = imgObj.width();
        imgHeight = imgObj.height();
        GFGcanvasDiv_parentImg = new ImageObject(imgWidth, imgHeight, imgLeft, imgHeight);

        GFGcanvasDiv = $(this).children("div.GFGcanvas");
        if (!GFGcanvasDiv.attr("class")) {
            GFGcanvasDiv = $("<div class=\"GFGcanvas\"></div>");
            GFGcanvasDiv.css({
                'left': imgLeft + 'px',
                'top': imgTop + 'px'
            });
            $(this).append(GFGcanvasDiv);
        }

        currentX = evt.pageX - imgLeft;
        currentY = evt.pageY - imgTop;
        
       

        if (currentX > GFGcanvasDiv_parentImg.ImgWidth || currentY > GFGcanvasDiv_parentImg.ImgHeight) {
            return;
        }

        if (!GFG_isFirstPointDrawn) {
            GFG_firstPoint = new Point(currentX, currentY);
            fstPtObj = drawCanvasPoint(GFGcanvasDiv, GFG_firstPoint, 'GFG_pt1', pointOffset);
            GFG_isFirstPointDrawn = true;
            return;
        }

        if (!GFG_isSecondPointDrawn) {
            if (currentX < GFG_firstPoint.X) {
                fstPtObj.remove();
                fstPtObj = null;
                GFG_isFirstPointDrawn = false;
                return;
            }
            GFG_secondPoint = new Point(currentX, currentY);
            sndPtObj = drawCanvasPoint(GFGcanvasDiv, GFG_secondPoint, 'GFG_pt2', pointOffset);
            GFG_isSecondPointDrawn = true;
        }

        if (GFG_isFirstPointDrawn && GFG_isSecondPointDrawn) {
            lineHtml = "";
           
            if (GFG_firstPoint.X > GFG_secondPoint.X) {
                lhsPoint = GFG_secondPoint;
                rhsPoint = GFG_firstPoint;
            }
            else {
                lhsPoint = GFG_firstPoint;
                rhsPoint = GFG_secondPoint;
            }

            
            lineHtml += getHtmlForPointToPointLine(lhsPoint, rhsPoint, imgWidth, imgHeight, TrendLineType.ConnectedLine, 'GFG_pe', config.colorBetweenPoints);
           

            //Angle of leading line
            dy = rhsPoint.Y - lhsPoint.Y;
            dx = rhsPoint.X - lhsPoint.X;
            slope = dy / dx;

            var radian = Math.atan(slope);
            var dec = Math.round(Math.pow(10, 4));
            var angleX = Math.round((-180 * radian / Math.PI) * dec) / dec;

           
            var degAdj = (90 - Math.abs(angleX))/90;
            degrees = config.gannFanDegs1;
            if(GFG_isGannFanSpecialKeyDown){
                degrees = config.gannFanDegs2;
            }

                        
            if (angleX > 0) {
                for (i = 0; i < degrees.length; i++) {
                    
                    
                    if (!GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * (1-degAdj), GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe' + i, GannFanType.Retracement);
                    }
                    if (!GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyMirrorKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * degAdj, GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe' + i, GannFanType.RetracementMirror);
                    }
                    
                    if (GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * (1-degAdj), GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe11', GannFanType.Retracement);
                    }
                    if (GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyMirrorKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * degAdj, GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe11', GannFanType.RetracementMirror);
                    }
                    
                    
                }
            }
            else if (angleX < 0) {
                for (i = 0; i < degrees.length; i++) {
                
                    
                    if (!GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * (1-degAdj), GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe' + i, GannFanType.Retracement);
                    }
                    if (!GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyMirrorKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * degAdj, GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe' + i, GannFanType.RetracementMirror);
                    } 
                    
                    
                    if (GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * (1-degAdj), GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe11', GannFanType.Retracement);
                    }
                    if (GFG_isGannFanSpecialKeyDown && GFG_isGannFanGenMaskKeyMirrorKeyDown){
                        lineHtml += getHtmlForLineGFG(angleX, lhsPoint.X, lhsPoint.Y, degrees[i], degrees[i] * degAdj, GFGcanvasDiv_parentImg.ImgWidth, GFGcanvasDiv_parentImg.ImgHeight, 'GFG_pe11', GannFanType.RetracementMirror);
                    }  
                    
                    
                    
                }
            }

 
         GFGcanvasDiv.append(lineHtml);
         GFG_isFirstPointDrawn = false;
         GFG_isSecondPointDrawn = false;
         resetGannFanMaskKeys();
                

         }

        
    });

    return $(this);
};


function getHtmlForLineGFG(angle, x1, y1, tdeg, deg, uBoundX, uBoundY, cssClass, FanType) {
    var htmlVal = "";
    var sinVal = 0;
    var cosVal = 0;
    

   if (angle < 0) {
        if (FanType === GannFanType.Retracement){
            sinVal = Math.sin(Math.PI * deg / 180);
            cosVal = Math.cos(Math.PI * deg / 180);
            deg = -deg;
        }
        if (FanType === GannFanType.RetracementMirror){
            deg = (-angle + deg);
            sinVal = Math.sin(Math.PI * deg / 180);
            cosVal = Math.cos(Math.PI * deg / 180);
            deg = -deg;
        }
    }
    else if (angle > 0) {
        if (FanType === GannFanType.Retracement){
            sinVal = Math.sin(Math.PI * -deg / 180);
            cosVal = Math.cos(Math.PI * -deg / 180);
//            deg = -deg;
        }
         if (FanType === GannFanType.RetracementMirror){
            deg = (-angle + -deg);
            sinVal = Math.sin(Math.PI * deg / 180);
            cosVal = Math.cos(Math.PI * deg / 180);
            deg = -deg;
        }       
    }


    var len = uBoundX - x1;
    var i = 0;
    var xVal = 0;
    var yVal = 0;
    var classOnLabel = '';
    var ptCssClass = '';
   

    while (true) {
        if ((i % 2) !== 0 && tdeg !== 45) {
            i++;
            continue;
        }
       
        xVal = (i * cosVal) + x1;
        yVal = (i * sinVal) + y1;
        
        if (yVal < 0){
            break;
        }
      
        if (angle > 0) {
            if (yVal >= uBoundY) {
                classOnLabel = 'GFG_fY';
                break;
            }
            else if (xVal >= uBoundX) {
                classOnLabel = 'GFG_fX';
                break;
            }
        }
        else if (angle < 0) {
            if (yVal >= uBoundY) {
                classOnLabel = 'GFG_fY';
                break;
            }
            else if (xVal >= uBoundX) {
                classOnLabel = 'GFG_fX';
                break;
            }
        }

        ptCssClass = 'GFG_pe';
        if (tdeg < 45) {
            ptCssClass += ' GFG_pe_H';
        }
        else {
            ptCssClass += ' GFG_pe_V';
        }

        htmlVal += "<div class='" + ptCssClass + " " + cssClass + "' style='left: " + xVal + "px; top: " + yVal + "px;'></div>";
        i++;
    }
    
    
    // Add text to Canvas.
    if(tdeg == 45){
        var txtPlaceX = x1;
        var txtPlaceY = y1;
       
         if (angle < 0) {
             txtPlaceY -= 5; txtPlaceX += 10;
             htmlVal += "<div class='GFG_pe' style='width:150px; height: 0px; left:" + txtPlaceX + "px; top:" + txtPlaceY + "px;' > <b><font color='#FF0000'>1x1:" + deg.toFixed(4) + "°</font></b></div>";
         }
         else{
            txtPlaceY += 10; txtPlaceX += 10;
             htmlVal += "<div class='GFG_pe' style='width:150px; height: 0px; left:" + txtPlaceX + "px; top:" + txtPlaceY + "px;' > <b><font color='#0026FF'>1x1:" + deg.toFixed(4) + "°</font></b></div>";
         }
    }
    
    return htmlVal;
}
