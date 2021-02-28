// POSTMAN COLLECTION URL: https://www.getpostman.com/collections/25fc20dadc99bfd97307

/**
 * 1. CREATE NEW FOLDER
 * Method: POST
 * URL: http://localhost:3000/folder
 * Body:  {
              "name": "Folder1",
              "parent": "root"
          }
 * 
 */

/**
 * 2. CREATE NEW FILE
 * Method: POST
 * URL: http://localhost:3000/file
 * Body:  {
            "name": "File2",
            "folderId": "603bdab8532fc6514a3a07d6",
            "format": "txt",
            "size": "145",
            "dimension": "320X600"
          }
 * 
 */

/**
 * 3. GET ALL FILES
 * Method: GET
 * URL: http://localhost:3000/file
 * Query:  {
            "name": "File2",
            "format": "PNG",
          }
 * 
 */

/**
 * 4. GET FOLDER SIZE
 * Method: GET
 * URL: http://localhost:3000/folder/{folderId}/size
 *
 */

/**
 * 5. UPDATE FOLDER NAME
 * Method: PATCH
 * URL: http://localhost:3000/folder
 * Body:{
          "folderId":"603bb9377c630f38da42b5f1",
          "name": "Folder1"
        }
 *
 */

/**
 * 6. DELETE FOLDER
 * Method: DELETE
 * URL: http://localhost:3000/folder
 * Body:{
          "folderId":"603bb9377c630f38da42b5f1",
        }
 *
 */
