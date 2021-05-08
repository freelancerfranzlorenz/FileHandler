/**
 * Project:    FileHandler
 * 
 * Author:     Franz Lorenz
 *             Kelheim, Germany
 */

class FileHandler 
{
    constructor() { }

    /**
     * This function saves a text file to the browser computer.
     * @param sFilename filename suggestion for the browser computer
     * @param sText     content of the file    
     */
    saveText( sFilename, sText )
    {
        let Data = new Blob( [sText], { type: 'text/plain' } );
        this.saveBlob( sFilename, Data );
    }

    /**
     * This function saves different content to the browser computer.
     * @param sFilename filename suggestion for the browser computer
     * @param Data      content of the file (see Blob for more information)
     */
    saveBlob( sFilename, Data )
    {
        let sUrl = window.URL.createObjectURL( Data );
        let Ele = document.createElement( 'a' );
        Ele.href = sUrl;
        Ele.download = sFilename;
        document.body.appendChild( Ele );
        Ele.click();
        window.URL.revokeObjectURL( sUrl );
        document.body.removeChild( Ele );
    }

    /**
     * This function loads a file from the browser computer.
     * @param Callback      callback function for handling the files
     * @param sAcceptFilter acception filter
     * @param bMultiple     bool if multiple files should be loaded in one session
     */ 
    loadfile( Callback, sAcceptFilter='.txt', bMultiple=false )
    {
        let Ele = document.createElement( 'input' );
        Ele.type = 'file';
        Ele.name = 'files[]';
        Ele.multiple = bMultiple;
        Ele.accept = sAcceptFilter;
        Ele.onchange = Callback;
        document.body.appendChild( Ele );
        Ele.click();
        document.body.removeChild( Ele );
    }

    /**
     * This function handles text files.
     * NOTE: This function call a global function named
     *       function FileHandlerText( sText, File )
     *       with the parameters sText and File
     */
    handleTextFiles( Event )
    {
        let aFiles = Event.target.files;
        for( let n=0; n<aFiles.length; n++ )
        {
            var Reader = new FileReader();
            Reader.onload = function( e ) 
            {
                FileHandlerText( e.target.result, aFiles[n] );
            };
            Reader.readAsText( aFiles[n] );    
        }   //for()
    }

}   //end-of-class
