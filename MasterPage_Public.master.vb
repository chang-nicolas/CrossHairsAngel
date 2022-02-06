Option Strict On
Option Explicit On

Imports System
Imports OboutInc.EasyMenu_Pro

Partial Class MasterPage_Public
    Inherits System.Web.UI.MasterPage
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Me.labCopyright.Text = "Copyright " & Now.Year() & "&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;readtheticker.com"
    End Sub
End Class

