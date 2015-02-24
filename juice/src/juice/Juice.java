package juice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.StringTokenizer;

public class Juice {

    private List<String> components = null;

    public List <String> getComponents () {
        return components;
    }

    public void setComponents(List<String> components) {
        this.components = components;
    }

    public Juice() {
        components = new ArrayList<String>();
    }

    public Juice(String str) {
        components = new ArrayList<String>();
        StringTokenizer st = new StringTokenizer(str);
        while (st.hasMoreTokens()) {
            components.add(st.nextToken());
        }
        Collections.sort(components);
    }
}
