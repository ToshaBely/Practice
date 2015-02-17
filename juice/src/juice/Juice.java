package juice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

public class Juice {

    private ArrayList<String> components;

    ArrayList <String> getComponents () {
        return components;
    }

    Juice() {
        components = new ArrayList<String>();
    }
    void inputComponents (String str){
        StringTokenizer st = new StringTokenizer(str);
        while (st.hasMoreTokens()){
            components.add(st.nextToken());
        }
        Collections.sort(components);
    }
}
