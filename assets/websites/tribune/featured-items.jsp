<%@ taglib uri="/content.tld" prefix="content" %>
<%@ taglib uri="/utility.tld" prefix="utility" %>
<%@ taglib uri="/branding.tld" prefix="branding" %>
<%@ taglib uri="/dynamicsection.tld" prefix="dynamicsection" %>
<%@ taglib tagdir="/WEB-INF/tags/content" prefix="o" %>
<%@ page import="trb.tii.turbine.tags.util.UtilityStaticMethods" %>

<dynamicsection:pmvalue name="collection" variable="collCode" />
<dynamicsection:pmvalue name="primaryHeader" variable="mTitle" />
<dynamicsection:pmvalue name="primaryHeaderLink" variable="mTitleLink" />
<dynamicsection:pmvalue name="limit" variable="itemLimit" />
<dynamicsection:pmvalue name="singleColumn" variable="singleCol" />

<% 
  mTitle = UtilityStaticMethods.ifNullReturnEmpty(mTitle).trim();
  mTitleLink = UtilityStaticMethods.ifNullReturnEmpty(mTitleLink).trim();
  itemLimit = UtilityStaticMethods.ifNullReturnEmpty(itemLimit).trim();
  singleCol = UtilityStaticMethods.ifNullReturnEmpty(singleCol).trim().toLowerCase();

  //Default Attributes
  int cCount=0;
  int itemCount = 0;
  int photoMaxWidth = 650; 
  boolean relatedItems = false ;
  boolean relatedPhoto = false ;
  String layout = "narrow"; 
%>

<content:collection code="<%=collCode%>" filter="type=hyperlink/storylink">
  <content:collection-items>
     <content:item>
     <% cCount++; %>
       <utility:variable name="thumb"><o:imageurl mediaType="thumbnail"/></utility:variable>
         <utility:variable name="alt"><o:imageurl mediaType="alternatethumbnail"/></utility:variable>
         <utility:variable name="thumbw"><utility:get field="thumbnailwidth" /></utility:variable>
         <utility:variable name="thumbh"><utility:get field="thumbnailheight" /></utility:variable>
         <utility:variable name="altw"><utility:get field="alternatethumbnailwidth" /></utility:variable>
         <utility:variable name="alth"><utility:get field="alternatethumbnailheight" /></utility:variable>
         <% if (Integer.parseInt(altw) > 225) { layout="wide"; }%>
     </content:item>
  </content:collection-items>
</content:collection>    
    
<%
   int collectionLimit = cCount; 
   if (!itemLimit.equals("")) { collectionLimit = Integer.parseInt(itemLimit); }
%>
   
<% if (singleCol.equals("yes")){ layout="single_column"; } %>    
<content:collection code="<%=collCode%>" limit="<%=collectionLimit%>" suppressduplicates="yes" filter="type=hyperlink/storylink">
 <div id="adss_packages" class="adss_featured_packages <%= layout %>">
  <% if (!mTitle.equals("")) { %>
  <div class="adss_module_title">
    <% if (!mTitleLink.equals("")) {%><a href="<%=mTitleLink%>"><%}%><%= mTitle %><% if (!mTitleLink.equals("")) {%></a><%}%>
  </div>
  <%}%>
  <content:collection-items>
   <div class="package">                       
     <content:item>
       <% itemCount++;
          int relatedCount=0;
          relatedItems = false;
          relatedPhoto = false; 
       %>
       <utility:variable name="linkURL"><content:url-field /></utility:variable>
       <utility:variable name="linkURLTarget"><utility:get field="target" variable="linkTarget" /></utility:variable>
         
         <utility:variable name="packageTitle">
           <content:check-type value="hyperlink">
              <utility:get field="target" variable="linkTarget" />
              <a href="<content:url-field/>" target="<%= linkTarget %>"><content:title/></a>          
            </content:check-type>
            <content:check-type value="storylink">
              <content:title/>          
            </content:check-type>
         </utility:variable>
         
         <%-- IMAGES --%>
         <utility:variable name="packageThumb"><a href="<%= linkURL %>" target="<%= linkURLTarget %>"><o:imageurl mediaType="thumbnail" maxwidth="187"/></a></utility:variable>
         <utility:variable name="packageAlt"><a href="<%= linkURL %>" target="<%= linkURLTarget %>"><o:imageurl mediaType="alternatethumbnail" maxwidth="240"/></a></utility:variable>
         <utility:variable name="thumbwidth"><utility:get field="thumbnailwidth" /></utility:variable>
         <utility:variable name="thumbheight"><utility:get field="thumbnailheight" /></utility:variable>
         <utility:variable name="altwidth"><utility:get field="alternatethumbnailwidth" /></utility:variable>
         <utility:variable name="altheight"><utility:get field="alternatethumbnailheight" /></utility:variable>
         <utility:variable name="notes"><utility:get field="notes" /></utility:variable>

         <%-- Related Photo --%>
         <utility:variable name="packagePhoto">
          <content:relations suppressduplicates="yes">
           <content:related-items filter="type=photo">
            <content:item>
             <content:check-type value="photo">
               <utility:variable name="altText"><content:caption /></utility:variable>
               <o:imageurl alt="<%=altText%>" maxwidth="<%=photoMaxWidth%>"/> 
             </content:check-type>   
            </content:item>
           </content:related-items>
          </content:relations>
         </utility:variable>
          
         <%-- Related Blurb --%>
         <utility:variable name="packageDescription">
          <content:relations suppressduplicates="yes">
           <content:related-items filter="type=blurb">
            <content:item>
             <content:check-type value="blurb">
                <content:body/>
             </content:check-type>   
            </content:item>
           </content:related-items>
          </content:relations>         
         </utility:variable>

         <%-- Related Hyperlink --%>
         <utility:variable name="packageRelatedLink">
          <content:relations suppressduplicates="yes">
           <content:related-items filter="type=hyperlink">
            <content:item>
             <content:check-type value="hyperlink">
               <utility:get field="target" variable="linkTarget" />
               <a href="<content:url-field/>" target="<%= linkTarget %>"><content:title/></a> 
             </content:check-type>   
            </content:item>
           </content:related-items>
          </content:relations>         
         </utility:variable>

         <%-- Related Storylink --%>
         <utility:variable name="packageCallToAction">
          <content:relations suppressduplicates="yes">
           <content:related-items filter="type=storylink">
            <content:item>
             <content:check-type value="storylink">
               <utility:get field="target" variable="linkTarget" />
               <a class="purchase" href="<content:url-field/>" target="<%= linkTarget %>"><span><content:title/></span></a> 
             </content:check-type>   
            </content:item>
           </content:related-items>
          </content:relations>         
         </utility:variable>

         <%-- related items check --%>
         <content:relations suppressduplicates="no">
          <content:related-items filter="type=photo/blurb/hyperlink/storylink">
           <content:item>
             <% relatedItems = true; relatedCount++; %>
             <content:check-type value="photo">
                <% relatedPhoto = true; %>
              </content:check-type> 
           </content:item>
          </content:related-items>
         </content:relations>         
         

    <% if (singleCol.equals("yes")){ %>    
    <%-- SINGLE COLUMN LAYOUT (Create An Ad Page) --%>
     <table>
      <tr>
       <% if (Integer.parseInt(thumbwidth) > 50) {%><td class="package_photo"><a href="<%=linkURL%>"><%= packageThumb %></a></td><%}%>
       <td valign="bottom">
         <div class="package_title"><%= packageTitle %></div>
         <% if (!packageDescription.equals("")) {%><div class="package_description"><%= packageDescription %></div><%}%>
         <% if (!packageRelatedLink.equals("")) {%><div class="package_call_to_action"><%= packageRelatedLink %></div><%}%> 
       </td>
      </tr>
     </table>  
    <%-- END SINGLE COLUMN LAYOUT --%>
    
    <% } else { %>
    <%-- DEFAULT LAYOUT (Main Packages / Business Packages / Category(with related photo) / Package pages)--%>              
         <% if (relatedItems) { %>
             <% if (relatedPhoto){%>
               <div class="package_photo"><%= packagePhoto %></div>
               <div class="package_title"><%= packageTitle %></div>
             <% } else { %>
                <% if (Integer.parseInt(thumbwidth) > 0){ %>
                 <div class="package_sm<% if (itemCount%3 == 0){%> third<%}%>">
                   <div class="package_image"><%= packageThumb %></div>
                <% } else { %>
                 <div class="package_lg<% if (itemCount%3 == 0){%> third<%}%>">
                   <div class="package_image"><%= packageAlt %></div>
                <%}%>             
             <%}%>
              <% String divClass = (packageCallToAction.trim().length() > 1)? "package_content" : "package_content_full"; %>
               <div class="<%= divClass %>">
                 <div class="package_description">
                   <%= packageDescription %>             
                   <% if (packageRelatedLink.trim().length() > 1){ %><span><%= packageRelatedLink %></span><% } %>
                 </div>
                  <% if (packageCallToAction.trim().length() > 1){ %>
                    <div class="package_call_to_action"><%= packageCallToAction %></div>
                  <%}%>   
               </div>
               <% if (!relatedPhoto){ %></div><%}%>       
                            
         <% } else { %>
               
             <% if (Integer.parseInt(thumbwidth) > 0){ %>
                <div class="package_sm<% if (itemCount%3 == 0){%> third<%}%>">
                  <div class="package_image"><%= packageThumb %></div>
                  <div class="package_bg"><%= packageTitle %></div>
                </div>  
             <% } else { %>
                <div class="package_lg<% if (itemCount%3 == 0){%> third<%}%>">
                  <div class="package_image"><%= packageAlt %></div>
                  <div class="package_bg"><%= packageTitle %></div>
                </div>  
             <%}%>
                  
         <%}%>       
    <%-- END DEFAULT LAYOUT --%>              
    <%}%>     
            
     </content:item>
    </div>
    <% if (itemCount%3 == 0){%><div class="clear"></div><%}%>
  </content:collection-items>
 </div>
 <div class="clearRight"></div>
</content:collection>

