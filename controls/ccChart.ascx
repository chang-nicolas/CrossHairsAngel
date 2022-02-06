<%@ Control Language="VB" AutoEventWireup="false" Inherits="controls_ccChart" CodeFile="ccChart.ascx.vb" %>
<!--DIV MUST REMAIN A ASP SERVER CONTROL style="margin: 8px 20px;width:587px"-->
<div id="divChart" runat="server"  >
    <img src="images/DrawGuide.png" width="587px" height="344px" alt="" visible="true" />
</div>
<!--SCRIPTS-->

<script type="text/javascript" language="javascript">
   
   
   
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
    **** T - 84 (Trendline generator Ray ADDED DEGREES 2020-05-19)
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
    **** 9 - 57 (Horizontal Semi Cirlce or ARC)
    **************************************************************************************************************/
    


    

    
    
var verticalColor = '#FF0000';
var horizontalColor = '#FF0000';
var thick = 1;
var index = 0;
$(document).ready(function() {
    options = { h_color: horizontalColor, v_color: verticalColor, thickness: thick };
    $("#<%= divChart.ClientID %>").crosshair(options);
});

    
    degs1 = [3.75, 7.50, 15.00, 26.25, 45.00, 63.75, 75.00, 82.50, 86.25]; degs2 = [5.625, 11.25, 20.625, 35.625, 54.375, 69.375, 78.75, 84.375];
    var config_AG = { lineDegrees1: degs1, lineDegrees2: degs2, positiveMaskKeyCode: 88, negetiveMaskKeyCode: 90 };
    var config_CG = { cycleGenMaskKeyCode1: 54, cycleGenMaskKeyCode2: 55, cycleGenMaskKeyCode3: 56, lineColor1: '#00EF1B', lineColor2: '#0026FF', lineColor3: '#FF0000' };
    var config_TG = { trendLineGenMaskKeyCode: 84, connectedTrendLineGenMaskKeyCode: 71, fullTrendLineGenMaskKeyCode: 70, lineColor: '#000' };
    retracePercentage1 = [0.236, 0.382, 0.5, 0.618, 0.786, 1.0]; retracePercentage2 = [0.25, 0.375, 0.5, 0.625, 0.75, 1.0];
    var config_RG = { retraceGenMaskKeyCode: 81, retracementPercentage1: retracePercentage1, retracementPercentage2: retracePercentage2, colorBetweenPoints: '#f00' };
    var config_ARG = { upArrowMaskKey: 85, downArrowMaskKey: 68, upArrowImgSrc: 'images/up.png', downArrowImgSrc: 'images/down.png' };
    var config_CHG = { channelGenMaskKeyCode: 67, channelColor: '#FF0000', divisionColor: '#999', colorBetweenPoints:'#FF0000' };
    var config_CHGC = { channelGenMaskKeyCode: 82, channelColor: '#FF0000', divisionColor: '#999', colorBetweenPoints:'#FF0000' };
    var config_PFG = { pinchForkGenMaskKeyCode: 80, lineColor: '#0000FF', divisionColor: '#999', colorBetweenPoints: '#000' };
    var config_PFGC = { pinchForkGenMaskKeyCode: 79, lineColor: '#0000FF', divisionColor: '#999', colorBetweenPoints: '#000' };
    expRatio1 = [0.382, 0.618, 1, 1.382, 1.618, 2.0, 2.618, 3.0, 4.0, 5.0]; expRatio2 = [0.50, 0.75, 1, 1.50, 1.75, 2.0, 2.5, 3.0, 4.0, 5.0];
    var config_PEG = { priceExpansionGenMaskKeyCode: 65, expansionRatio1: expRatio1, expansionRatio2: expRatio2, colorBetweenPoints: '#f0f' };
    var bbg_degs = [3.75, 7.50, 15.00, 26.25, 45.00, 63.75, 75.00, 82.50, 86.25];
    var config_BBG = {  bullBearGridMaskKeyCode: 78,  bullBearArcMaskKeyCode: 77,  bullBearArcAngleMaskKeyCode: 74,  bullBearArcAngleGridMaskKeyCode: 75, 
        firstArcColor: '#f0f',  firstArcAdj:1.05, colorBetweenPoints: '#000', solidArcColor:'#0f0',  dashedArcColor:'#800',
        bullGridColor:'#00f', bearGridColor:'#f00',angleDegrees: bbg_degs};
    var config_HG = { horizontalMaskKeyCode: 72 };
    var config_VG = { verticalMaskKeyCode: 86 };
    fibonacciPercentage1 = [0.236, 0.382, 0.5, 0.618, 0.786]; fibonacciPercentage2 = [0.25, 0.375, 0.5, 0.625, 0.75];
    var config_FFG = { fibonacciFanGenMaskKeyCode: 69, fibonacciFanPercentage1: fibonacciPercentage1, fibonacciFanPercentage2: fibonacciPercentage2, colorBetweenPoints: '#f00' };
    var config_TBG = { textBoxMaskKeyCode:87, maxLength: 250};
    var config_GRG = { horizontalMaskKeyCode: 83, verticalMaskKeyCode: 73, lineColor: '#0f0', secondLineColor: '#00f', firstDistance:0.61803399, secondDistance:1.61803399 };
    var config_REC = { rectangleMaskKeyCode: 66, lineColor: '#999', divisionColor: '#999', colorBetweenPoints: '#00f' };
    var config_SEM = { SemiCircleMaskKeyCode: 57, lineColor: '#999', divisionColor: '#999', colorBetweenPoints: '#00f' };
    expRatioW = [0, 0.50, 1];
    var config_PEGW = { priceExpansionGenMaskKeyCode: 76, expansionRatio: expRatioW, colorBetweenPoints:  '#000' };
    var config_TTHY = { TTheoryMaskKeyCode: 49, lineColor: '#999', divisionColor: '#999', colorBetweenPoints: '#00f' };
    var config_TTHYD = { TTheoryMaskKeyCode: 50, lineColor: '#999', divisionColor: '#999', colorBetweenPoints: '#00f' };
    var config_PEGT = { TimeExpansionGenMaskKeyCode: 51, expansionRatio1: expRatio1, expansionRatio2: expRatio2, colorBetweenPoints: '#f0f' };
//    var FanDegs = [3.75, 7.50, 15.00, 26.25, 45.00, 63.75, 75.00, 82.50, 86.25];
//    var config_GFG = { GannFanGenMaskKeyCode: 52, GannFanGenMaskKeyMirrorCode: 53, gannFanDegs: FanDegs, colorBetweenPoints: '#f00' };

    FanDegs1 = [3.75, 7.50, 15.00, 26.25, 45.00, 63.75, 75.00, 82.50, 86.25]; FanDegs2 = [1.875, 5.625, 11.25, 20.625, 35.625, 54.375, 69.375, 78.75, 84.375, 88.125];
    var config_GFG = { GannFanGenMaskKeyCode: 52, GannFanGenMaskKeyMirrorCode: 53, gannFanDegs1: FanDegs1, gannFanDegs2: FanDegs2, colorBetweenPoints: '#f00' };

    
    $("#<%= divChart.ClientID %>")
		.makeAngles(config_AG)
		.makeCycles(config_CG)
		.makeTrendLines(config_TG)
		.makeRetracement(config_RG)
		.makeArrows(config_ARG)
		.makeChannels(config_CHG)
		.makeChannels(config_CHGC)
		.makePitchForks(config_PFG)
		.makePitchForks(config_PFGC)
		.makePriceExpansion(config_PEG)
		.makePriceExpansion(config_PEGW)
		.makeBullBear(config_BBG)
		.makeVerticalLines(config_VG)
		.makeHorizontalLines(config_HG)
		.makeFibonacciFan(config_FFG)
		.makeTextboxes(config_TBG)
		.makeGoldenRatioH(config_GRG)
		.makeGoldenRatioV(config_GRG)
		.makeRectangle(config_REC)  
		.makeSemiCircle(config_SEM)
		.makeTTheory(config_TTHY)
		.makeTTheory(config_TTHYD)
		.makeTimeExpansion(config_PEGT) 
		.makeGannFan(config_GFG) 
		//.locatePoint()
		;
		
		

   
  
</script>

