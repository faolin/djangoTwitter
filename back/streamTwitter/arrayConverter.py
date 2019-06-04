'''Sqlite3 notre db ne permet pas de stocker des array, l on doit donc les convertir en string pour les stocker
mais aussi pouvoir les reconvertir en array ensuite'''

strSeparator = "__,__"
#convertir un array en string
def convertArrayToString(array):
    str = ""
    for i in range(len(array)):
        str = str+ array[i]
        # Do not append comma at the end of last element
        if(i<len(array)-1):
            str = str+strSeparator
    return str

#converti une string en array grâce au séparateur
def convertStringToArray(str):
    arr = str.split(strSeparator)
    return arr
