package juice;

import java.util.Collections;
import java.util.List;

public class Sort implements Runnable {

    private List<Juice> list;

    public Sort(List <Juice> list) {
        this.list = list;
    }

    public List<Juice> getList() {
        return list;
    }

    public void setList(List<Juice> list) {
        this.list = list;
    }

    @Override
    public void run() {
        Collections.sort(list, new ComponentComparator());
    }
}
