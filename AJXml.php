<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>ArtJail XML File Editor</title>

<?php

function readXMLFile($file)
{
	$site = simplexml_load_file($file); // get the contents of the XML file
											 // next: loop through all the projects
	
	foreach($site->content->section as $section)
	{
		switch((string) $section['section'])
		{
			case 'Projects':	// we are reading the list of projects and need to generate a fieldset for each project in the list
				print("<form>");
				
				foreach($section->project as $proj)
				{
					
					print("<fieldset>");
					print("Project Name: <input type='text' size='24' value='" . $proj['info'] . "'/> <br/> Client: <input type='text' size='24' value='" . $proj['client'] . "'/> <br/> Agency: <input type='text' size='32' value='" . $proj['agency'] . "'/> <br/> BG Image: <input type='text' size='32' value='" . $proj['image'] . "'/> <br/> Vimeo ID: <input type='text' size='12' value='" . $proj['video'] . "'/>");
					print("</fieldset> <br/>");
				}
				
				print("</form>");
		}
	}
}

?>

</head>

<body>

<?php

	readXMLFile("artjail.xml");
?>

</body>
</html>