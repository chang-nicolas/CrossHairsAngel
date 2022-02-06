<%@ Page Language="VB" MasterPageFile="~/MasterPage_Public.master" %>

<%@ Register Src="controls/ccDoubleControl.ascx" TagName="ccDoubleControl" TagPrefix="uc2" %>

<%@ Register Src="controls/ccChart.ascx" TagName="ccChart" TagPrefix="uc1" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script type="text/javascript" src="Scripts/jquery.js"></script>
    <script type="text/javascript" src="Scripts/crosshairs.js"></script>
    <script type="text/javascript" src="Scripts/drawings.js"></script>
    Cross javascript is must be on the usercontrol ccChart.ascx<br />
    <br />
    <asp:HyperLink ID="HyperLink13" runat="server" NavigateUrl="~/README/ReadMeFirst.txt"
        Width="500px">READ ME FIRST FILE</asp:HyperLink><br />
    <br />
    <hr />
    Test the cross hairs on the (userControl) charts below<br />
    <br />
    
    <table>
    <tr>
    <td width="50px" />
    <td>
    
    <span class="MediumTitle">ONE</span><br /><br />
    <uc1:ccChart ID="CcChart1" runat="server" />
    <br />
    <br />
    <br />
    <span class="MediumTitle">TWO</span><br /><br />
    <uc1:ccChart ID="CcChart2" runat="server" />
    <br />
    <br />
    <br />
    <span class="MediumTitle">THREE<br /><br /><br />
    <uc2:ccDoubleControl ID="CcDoubleControl1" runat="server" />
    </span>
    
    
    </td>
    </tr>
    </table>

</asp:Content>
