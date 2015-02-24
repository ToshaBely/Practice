package juice;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Elements {

    private Set<String> products;
    private List<String> normalProducts;
    private List <Juice> list;

    public Elements() {
        normalProducts = new ArrayList<String>();
        products = new TreeSet<String>();
        list = new ArrayList<Juice>();
    }

    public void setList(List<Juice> list) {
        this.list = list;
    }

    public void setProducts(Set<String> products) {
        this.products = products;
    }

    public void setNormalProducts(List<String> normalProducts) {
        this.normalProducts = normalProducts;
    }

    public List<Juice> getList() {
        return list;
    }

    public List<String> getNormalProducts() {
        return normalProducts;
    }

    public Set<String> getProducts() {
        return products;
    }
}
